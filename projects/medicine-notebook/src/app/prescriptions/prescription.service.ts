import { inject, Injectable } from '@angular/core';
import {
  limit,
  orderBy,
  QueryConstraint,
  QueryDocumentSnapshot,
  QuerySnapshot,
  startAfter,
  where,
} from 'firebase/firestore';
import { FirestoreService } from 'projects/ngx-firebase-user-platform/src/lib/firestore.service';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  map,
  Observable,
  OperatorFunction,
  scan,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  takeWhile,
  tap,
} from 'rxjs';
import { Prescription, PrescriptionFactory, RxWithId } from './prescription-factory';
import { PaginatedService } from '../shared/paginated.service.abstract';

@Injectable({
  providedIn: 'root',
})
export class PrescriptionService extends PaginatedService<RxWithId[]> {
  protected rootKey = 'prescriptions';
  private firestore = inject(FirestoreService);
  private factory = new PrescriptionFactory();

  get$(id: string): Observable<RxWithId> {
    return this.firestore.get$<RxWithId>(this.rootKey, id).pipe(
      map((value) => {
        if (!value) throw ReferenceError('Member not found.');
        return value;
      }),
    );
  }

  private searchSubjectCache = new WeakMap<Object, BehaviorSubject<string>>();
  watchAll$(component: Object, memberId: string): Observable<RxWithId[]> {
    const ownedByMember = where('memberId', '==', memberId);
    const orderByDispenseDate = orderBy('dispensedAt', 'desc');
    const qLimit = limit(10);
    const fiveMonthsAgo = new Date();
    fiveMonthsAgo.setMonth(new Date().getMonth() - 5);
    const untilFiveMonthsAgo = where('dispensedAt', '>', fiveMonthsAgo.getTime());
    const nextPage$ = new Subject<void>();
    const refreshSubject = new Subject<void>();
    const searchText = new BehaviorSubject<string>('');
    this.nextPageSubjectCache.set(component, nextPage$);
    this.refreshSubjectCache.set(component, refreshSubject);
    this.searchSubjectCache.set(component, searchText);
    return combineLatest([refreshSubject.pipe(startWith(undefined)), searchText]).pipe(
      switchMap(([_, searchText]) =>
        nextPage$.pipe(
          debounceTime(100),
          startWith(undefined),
          this.loadRxsAndCacheLastDoc(searchText, ownedByMember, orderByDispenseDate, qLimit, untilFiveMonthsAgo),
          takeWhile((result) => !result.empty),
          map((result) => {
            if (result.empty) return [];
            const { docs } = result;
            return docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          }),
          scan((acc, current) => [...acc, ...current], [] as RxWithId[]),
        ),
      ),
    );
  }

  private loadRxsAndCacheLastDoc(
    searchText: string,
    ...args: QueryConstraint[]
  ): OperatorFunction<void, QuerySnapshot<Prescription>> {
    let lastDocCache: QueryDocumentSnapshot<Prescription> | undefined;
    return (source) =>
      source.pipe(
        switchMap(() => {
          const constraints = [...args];
          if (lastDocCache) constraints.push(startAfter(lastDocCache));
          return this.firestore.query$<Prescription>(this.rootKey, ...constraints);
        }),
        tap((result) => {
          if (result.empty) return;
          lastDocCache = result.docs.at(-1);
        }),
      );
  }

  public setSearch(component: Object, searchText: string) {
    const searchId$ = this.searchSubjectCache.get(component);
    if (!searchId$) throw ReferenceError('Search subject not in cache.');
    searchId$.next(searchText);
  }

  private memberIdCache?: string;
  private cachedTime?: number;
  private cachedRxs$?: Observable<RxWithId[]>;
  getByMember$(memberId: string): Observable<RxWithId[]> {
    if (memberId === this.memberIdCache && this.cachedTime && Date.now() - this.cachedTime < 1000) {
      return this.cachedRxs$!;
    } else {
      this.memberIdCache = memberId;
      this.cachedRxs$ = undefined;
      this.cachedTime = Date.now();
    }
    const ownedByMember = where('memberId', '==', memberId);
    const orderByDispenseDate = orderBy('dispensedAt', 'desc');
    const qLimit = limit(50);
    const fiveMonthsAgo = new Date();
    fiveMonthsAgo.setMonth(new Date().getMonth() - 5);
    const untilFiveMonthsAgo = where('dispensedAt', '>', fiveMonthsAgo.getTime());
    return (this.cachedRxs$ ||= this.firestore
      .query$<Prescription>(this.rootKey, ownedByMember, untilFiveMonthsAgo, qLimit, orderByDispenseDate)
      .pipe(
        map((result) => {
          if (result.empty) return [];
          return result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        }),
        shareReplay(1),
      ));
  }

  create$(rx: Omit<Prescription, 'createdAt' | 'memberId'> & { memberId: string }): Observable<string> {
    const producedRx = this.factory.create(rx);
    return this.firestore.create$(this.rootKey, producedRx).pipe(map((result) => result.id));
  }

  update$(id: string, rx: Partial<Prescription>) {
    return this.firestore.update$(this.rootKey, id, rx);
  }

  delete$(id: string) {
    return this.firestore.delete$(this.rootKey, id);
  }

  static getDaysRemainingForMedicine(
    dispensedAt: Prescription['dispensedAt'],
    amountDispensed: Prescription['medicines'][0]['amountDispensed'],
  ): number {
    const today = new Date();
    const dispensedAtDate = new Date(dispensedAt);
    const daysSinceDispensal = Math.floor((today.getTime() - dispensedAtDate.getTime()) / (1000 * 60 * 60 * 24));
    return amountDispensed - daysSinceDispensal;
  }

  static getDaysRemainingForRx(rx: Prescription) {
    const longestMedicineAmount = rx.medicines.reduce(
      (acc, cur) => (cur.amountDispensed > acc ? cur.amountDispensed : acc),
      1,
    );
    return this.getDaysRemainingForMedicine(rx.dispensedAt, longestMedicineAmount);
  }
}
