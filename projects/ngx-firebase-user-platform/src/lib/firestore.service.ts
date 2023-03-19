import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
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
  readonly db = this.firebaseService.firestore;

  get$<T extends { id: string }>(rootKey: string, id: string, options?: SnapshotOptions) {
    const ref = this.getRef<T>(rootKey, id);
    return from(getDoc(ref)).pipe(
      map((result) => {
        if (!result.exists) return undefined;
        return { ...result.data(options)!, id: result.id };
      }),
    );
  }

  getAll$<T>(rootKey: string) {
    const ref = this.getRef<T>(rootKey);
    return from(getDocs(ref));
  }

  watch$<T extends { id: string }>(rootKey: string, id: string, options?: SnapshotOptions): Observable<T> {
    return new Observable<DocumentSnapshot<T>>((observer) => {
      return onSnapshot(
        this.getRef<T>(rootKey, id),
        (result) => observer.next(result),
        observer.error.bind(this),
        observer.complete.bind(this),
      );
    }).pipe(
      map((result) => {
        if (!result.exists) throw Error('Tree not found.');
        const data = result.data(options)!;
        return { ...data, id: result.id };
      }),
    );
  }

  query$<T>(rootKey: string, ...args: QueryConstraint[]): Observable<QuerySnapshot<T>> {
    const ref = this.getRef<T>(rootKey);
    const q = query(ref, ...args);
    return from(getDocs(q));
  }

  create$(rootKey: string, data: any) {
    const ref = this.getRef(rootKey);
    return from(addDoc(ref, data));
  }

  update$(rootKey: string, id: string, data: any): Observable<void> {
    const ref = this.getRef(rootKey, id);
    return from(updateDoc(ref, data));
  }

  addToArrayField$(rootKey: string, id: string, field: string, item: any): Observable<void> {
    const ref = this.getRef(rootKey, id);
    return from(updateDoc(ref, { [field]: arrayUnion(item) }));
  }

  removeFromArrayField$(rootKey: string, id: string, field: string, item: any): Observable<void> {
    const ref = this.getRef(rootKey, id);
    return from(updateDoc(ref, { [field]: arrayRemove(item) }));
  }

  delete$(rootKey: string, id: string): Observable<void> {
    const ref = this.getRef(rootKey, id);
    return from(deleteDoc(ref));
  }

  private getRef<T = DocumentData>(rootKey: string): CollectionReference<T>;
  private getRef<T = DocumentData>(rootKey: string, id: string): DocumentReference<T>;
  private getRef(rootKey: string, id?: string) {
    return id ? doc(this.firebaseService.firestore, rootKey, id) : collection(this.firebaseService.firestore, rootKey);
  }
}
