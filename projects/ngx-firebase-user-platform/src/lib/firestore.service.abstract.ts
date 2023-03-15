import { DocumentData, DocumentReference, QueryConstraint, QuerySnapshot, SnapshotOptions } from 'firebase/firestore';
import { Observable } from 'rxjs';

export abstract class AbstractFirestoreService {
  abstract get$<T extends { id: string }>(key: string, id: string, options?: SnapshotOptions): Observable<T>;
  abstract getAll$(key: string): Observable<QuerySnapshot<DocumentData>>;
  abstract watch$<T extends { id: string }>(key: string, id: string, options?: SnapshotOptions): Observable<T>;
  abstract query$(key: string, ...args: QueryConstraint[]): Observable<QuerySnapshot<DocumentData>>;
  abstract create$(key: string, data: any): Observable<DocumentReference<any>>;
  abstract delete$(key: string, id: string): Observable<void>;
  abstract update$(key: string, id: string, data: any): Observable<void>;
}
