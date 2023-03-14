import { filter, first, map, mergeMap, Observable, of, ReplaySubject, switchMap, take, tap, toArray } from 'rxjs';
import { DbWorkerAbstract } from './db-worker.abstract';
import { EntryFactory } from './entry-factory';

export abstract class DbWorker<T extends Record<string, any>> extends DbWorkerAbstract<T> {
  static override dbName = 'MedicineDatabase';

  private readySubject = new ReplaySubject<boolean>();
  readonly ready$ = this.readySubject.asObservable();
  protected abstract factory: EntryFactory<T>;

  createDb$(csvRaw: string) {
    const entries = this.factory.parse(csvRaw);
    return this.getDb$().pipe(
      mergeMap(({ db, needsUpgrade }) => (needsUpgrade ? this.upgradeDb$(db, entries) : of(db))),
      tap(() => {
        this.readySubject.next(true);
      }),
    );
  }

  get$(key: string): Observable<T> {
    return this.ready$.pipe(
      filter(Boolean),
      first(),
      switchMap(() => this.getDb$()),
      map(({ db }) => db),
      mergeMap(
        (db) =>
          new Observable<T>((observer) => {
            const controller = new AbortController();
            let finished = false;
            const transaction = db.transaction([this.storeName], 'readonly');
            transaction.addEventListener(
              'complete',
              () => {
                finished = true;
                observer.complete();
              },
              { signal: controller.signal },
            );
            transaction.addEventListener('error', () => observer.error(), {
              signal: controller.signal,
            });

            const store = transaction.objectStore(this.storeName);
            const request = store.get(key);
            request.addEventListener('success', () => observer.next(request.result), {
              signal: controller.signal,
            });

            return () => {
              controller.abort();
              if (!finished) transaction.abort();
            };
          }),
      ),
    );
  }

  search$(field: keyof T, searchValue: T[keyof T]): Observable<T[]> {
    return this.ready$.pipe(
      filter(Boolean),
      first(),
      switchMap(() => this.getDb$()),
      map(({ db }) => db),
      switchMap(
        (db) =>
          new Observable<T>((observer) => {
            const controller = new AbortController();
            let finished = false;
            const transaction = db.transaction([this.storeName], 'readonly');
            transaction.addEventListener(
              'complete',
              () => {
                observer.complete();
              },
              { signal: controller.signal },
            );
            transaction.addEventListener('error', () => observer.error(transaction.error), {
              signal: controller.signal,
            });

            const regex = new RegExp(`^${searchValue}`);
            const store = transaction.objectStore(this.storeName);
            const cursorRequest = store.openCursor();
            cursorRequest.addEventListener(
              'success',
              (event) => {
                const cursor = (event.target as IDBRequest).result as IDBCursorWithValue;
                if (!cursor) return observer.complete();
                const value = cursor.value as T;
                const isPartialMatch = String(value[field]).match(regex);
                if (isPartialMatch) {
                  observer.next(value);
                }
                if (!finished) cursor.continue();
              },
              { signal: controller.signal },
            );
            cursorRequest.addEventListener('error', () => observer.error(cursorRequest.error), { signal: controller.signal });

            return () => {
              finished = true;
              controller.abort();
              transaction.abort();
            };
          }),
      ),
      take(10),
      toArray(),
    );
  }

  add$(object: T): Observable<void> {
    return this.ready$.pipe(
      filter(Boolean),
      first(),
      switchMap(() => this.getDb$()),
      map(({ db }) => db),
      mergeMap(
        (db) =>
          new Observable<void>((observer) => {
            const controller = new AbortController();
            let finished = false;
            const transaction = db.transaction([this.storeName], 'readwrite');
            transaction.addEventListener(
              'complete',
              () => {
                finished = true;
                observer.complete();
              },
              { signal: controller.signal },
            );
            transaction.addEventListener('error', () => observer.error(), {
              signal: controller.signal,
            });

            const store = transaction.objectStore(this.storeName);
            const request = store.add(this.factory.create(object));
            request.addEventListener('success', () => observer.next(undefined), {
              signal: controller.signal,
            });

            return () => {
              controller.abort();
              if (!finished) transaction.abort();
            };
          }),
      ),
    );
  }

  delete$(key: string) {
    return this.ready$.pipe(
      filter(Boolean),
      first(),
      switchMap(() => this.getDb$()),
      mergeMap(
        ({ db }) =>
          new Observable<void>((observer) => {
            const controller = new AbortController();
            let finished = false;
            const transaction = db.transaction([this.storeName], 'readwrite');
            transaction.addEventListener(
              'complete',
              () => {
                observer.next(undefined);
                finished = true;
                observer.complete();
              },
              { signal: controller.signal },
            );
            transaction.addEventListener('error', () => observer.error(), {
              signal: controller.signal,
            });

            const store = transaction.objectStore(this.storeName);
            store.delete(key);

            return () => {
              controller.abort();
              if (!finished) transaction.abort();
            };
          }),
      ),
    );
  }

  private db?: IDBDatabase;
  private getDb$() {
    return new Observable<{ db: IDBDatabase; needsUpgrade: boolean }>((observer) => {
      if (this.db) {
        observer.next({ db: this.db, needsUpgrade: false });
        observer.complete();
        return;
      }
      const controller = new AbortController();
      const request = indexedDB.open(DbWorker.dbName, this.version);
      request.addEventListener(
        'success',
        (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          observer.next({ db, needsUpgrade: false });
          observer.complete();
        },
        { signal: controller.signal },
      );
      request.addEventListener(
        'upgradeneeded',
        (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          observer.next({ db, needsUpgrade: true });
          observer.complete();
        },
        { signal: controller.signal },
      );
      request.addEventListener('error', () => observer.error(), {
        signal: controller.signal,
      });
      return () => controller.abort();
    }).pipe(tap(({ db }) => (this.db = db)));
  }

  private upgradeDb$(db: IDBDatabase, medicines: Map<string, T>) {
    return new Observable<IDBDatabase>((observer) => {
      const controller = new AbortController();
      let transactionCompleted = false;
      if (this.version > 1) db.deleteObjectStore(this.storeName);
      const objectStore = db.createObjectStore(this.storeName, {
        keyPath: 'code',
      });
      objectStore.transaction.addEventListener(
        'complete',
        () => {
          observer.next(db);
          transactionCompleted = true;
          observer.complete();
        },
        { signal: controller.signal },
      );
      objectStore.transaction.addEventListener('error', () => observer.error(), { signal: controller.signal });

      objectStore.createIndex('code', 'code', { unique: true });
      objectStore.createIndex('name', 'name', { unique: false });

      return () => {
        controller.abort();
        if (!transactionCompleted) objectStore.transaction.abort();
      };
    }).pipe(
      mergeMap(
        (db) =>
          new Observable<IDBDatabase>((observer) => {
            const controller = new AbortController();
            const transaction = db.transaction(this.storeName, 'readwrite');
            let transactionCompleted = false;
            transaction.addEventListener(
              'complete',
              () => {
                observer.next(db);
                transactionCompleted = true;
                observer.complete();
              },
              { signal: controller.signal },
            );
            transaction.addEventListener('error', () => observer.error(), {
              signal: controller.signal,
            });
            const medicinesStore = transaction.objectStore(this.storeName);
            medicines.forEach((medicine) => medicinesStore.add(medicine));

            return () => {
              controller.abort();
              if (!transactionCompleted) transaction.abort();
            };
          }),
      ),
    );
  }
}
