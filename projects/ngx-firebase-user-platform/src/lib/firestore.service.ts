import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  QueryConstraint,
  QuerySnapshot,
  SnapshotOptions,
  updateDoc,
} from 'firebase/firestore';
import { from, map, Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { AbstractFirestoreService } from './firestore.service.abstract';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService extends AbstractFirestoreService {
  private firebaseService = inject(FirebaseService);

  get$<T extends { id: string }>(key: string, id: string, options?: SnapshotOptions) {
    const ref = this.getRef(key, id);
    return from(getDoc(ref)).pipe(
      map((result) => {
        if (!result.exists) return undefined;
        return { ...result.data(options), id: result.id } as T;
      }),
    );
  }

  getAll$(key: string) {
    const ref = this.getRef(key);
    return from(getDocs(ref));
  }

  watch$<T extends { id: string }>(key: string, id: string, options?: SnapshotOptions): Observable<T> {
    return new Observable<DocumentSnapshot<DocumentData>>((observer) => {
      return onSnapshot(
        this.getRef(key, id),
        (result) => observer.next(result),
        observer.error.bind(this),
        observer.complete.bind(this),
      );
    }).pipe(
      map((result) => {
        if (!result.exists) throw Error('Tree not found.');
        const data = result.data(options)!;
        return { ...data, id: result.id } as T;
      }),
    );
  }

  query$(key: string, ...args: QueryConstraint[]): Observable<QuerySnapshot<DocumentData>> {
    const ref = this.getRef(key);
    const q = query(ref, ...args);
    return from(getDocs(q));
  }

  create$(key: string, data: any) {
    const ref = this.getRef(key);
    return from(addDoc(ref, data));
  }

  update$(key: string, id: string, data: any): Observable<void> {
    const ref = this.getRef(key, id);
    return from(updateDoc(ref, data));
  }

  delete$(key: string, id: string): Observable<void> {
    const ref = this.getRef(key, id);
    return from(deleteDoc(ref));
  }

  private getRef(key: string): CollectionReference<DocumentData>;
  private getRef(key: string, id: string): DocumentReference<DocumentData>;
  private getRef(key: string, id?: string) {
    return id ? doc(this.firebaseService.firestore, key, id) : collection(this.firebaseService.firestore, key);
  }
}
