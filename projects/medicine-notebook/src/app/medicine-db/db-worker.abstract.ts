import { Observable } from 'rxjs';

export abstract class DbWorkerAbstract<T extends Object> {
  static dbName: string;
  protected abstract storeName: string;
  protected abstract version: number;
  abstract readonly ready$: Observable<boolean>;

  abstract createDb$(csvRaw?: string): Observable<IDBDatabase>;

  abstract delete$(key: string): Observable<void>;

  abstract get$(key: string): Observable<T>;

  abstract add$(object: T): Observable<void>;

  abstract search$(field: keyof T, value: T[keyof T]): Observable<T[]>;
}
