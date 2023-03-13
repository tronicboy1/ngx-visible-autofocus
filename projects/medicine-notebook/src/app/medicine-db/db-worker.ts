import { filter, first, map, mergeMap, Observable, of, ReplaySubject, switchMap, take, tap, toArray } from 'rxjs';
import { DbWorkerAbstract } from './db-worker.abstract';

export type Medicines = Map<string, Medicine>;

interface Medicine {
  name: string;
  code: string;
  manufacturer: string;
  generic: boolean;
}

export class DbWorker extends DbWorkerAbstract<Medicine> {
  static override dbName = 'MedicineDatabase';
  static override storeName = 'medicines';
  static override version = 1;

  private readySubject = new ReplaySubject<boolean>();
  readonly ready$ = this.readySubject.asObservable();

  createDb$(csvRaw: string) {
    const medicines = this.parseRawCsv(csvRaw);
    return this.getDb$().pipe(
      mergeMap(({ db, needsUpgrade }) => (needsUpgrade ? this.upgradeDb$(db, medicines) : of(db))),
      tap(() => {
        this.readySubject.next(true);
      }),
    );
  }

  get$(key: string): Observable<Medicine> {
    return this.ready$.pipe(
      filter(Boolean),
      first(),
      switchMap(() => this.getDb$()),
      map(({ db }) => db),
      mergeMap(
        (db) =>
          new Observable<Medicine>((observer) => {
            const controller = new AbortController();
            let finished = false;
            const transaction = db.transaction([DbWorker.storeName], 'readonly');
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

            const store = transaction.objectStore(DbWorker.storeName);
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

  search$(field: keyof Medicine, searchValue: string | boolean): Observable<Medicine[]> {
    return this.ready$.pipe(
      filter(Boolean),
      first(),
      switchMap(() => this.getDb$()),
      map(({ db }) => db),
      switchMap(
        (db) =>
          new Observable<Medicine>((observer) => {
            const controller = new AbortController();
            let finished = false;
            const transaction = db.transaction([DbWorker.storeName], 'readonly');
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
            const store = transaction.objectStore(DbWorker.storeName);
            const cursorRequest = store.openCursor();
            cursorRequest.addEventListener(
              'success',
              (event) => {
                const cursor = (event.target as IDBRequest).result as IDBCursorWithValue;
                if (!cursor) return observer.complete();
                const value = cursor.value as Medicine;
                const isPartialMatch = value[field].toString().match(regex);
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
              if (!finished) transaction.abort();
            };
          }),
      ),
      take(10),
      toArray(),
    );
  }

  add$(object: Medicine): Observable<void> {
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
            const transaction = db.transaction([DbWorker.storeName], 'readwrite');
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

            const store = transaction.objectStore(DbWorker.storeName);
            const request = store.add(object);
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
            const transaction = db.transaction([DbWorker.storeName], 'readwrite');
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

            const store = transaction.objectStore(DbWorker.storeName);
            store.delete(key);

            return () => {
              controller.abort();
              if (!finished) transaction.abort();
            };
          }),
      ),
    );
  }

  private parseRawCsv(csvRaw: string): Medicines {
    const endOfFirstLine = csvRaw.indexOf('\n');
    const body = csvRaw.slice(endOfFirstLine + 1);
    const rows = body.split('\n');
    const rowsWithColumns = rows.map((row) => row.split(','));
    return rowsWithColumns.reduce((acc, current) => {
      if (!current[1]) return acc;
      return acc.set(current[1], {
        name: current[7],
        code: current[1],
        manufacturer: current[8],
        generic: current[9] === '後発品',
      });
    }, new Map() as Medicines);
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
      const request = indexedDB.open(DbWorker.dbName, DbWorker.version);
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

  private upgradeDb$(db: IDBDatabase, medicines: Medicines) {
    return new Observable<IDBDatabase>((observer) => {
      const controller = new AbortController();
      const objectStore = db.createObjectStore(DbWorker.storeName, {
        keyPath: 'code',
      });
      objectStore.transaction.addEventListener(
        'complete',
        () => {
          observer.next(db);
          observer.complete();
        },
        { signal: controller.signal },
      );
      objectStore.transaction.addEventListener('error', () => observer.error(), { signal: controller.signal });

      objectStore.createIndex('code', 'code', { unique: true });
      objectStore.createIndex('name', 'name', { unique: false });

      return () => {
        controller.abort();
        objectStore.transaction.abort();
      };
    }).pipe(
      mergeMap(
        (db) =>
          new Observable<IDBDatabase>((observer) => {
            const controller = new AbortController();
            const transaction = db.transaction(DbWorker.storeName, 'readwrite');
            transaction.addEventListener(
              'complete',
              () => {
                observer.next(db);
                observer.complete();
              },
              { signal: controller.signal },
            );
            transaction.addEventListener('error', () => observer.error(), {
              signal: controller.signal,
            });
            const medicinesStore = transaction.objectStore(DbWorker.storeName);
            medicines.forEach((medicine) => medicinesStore.add(medicine));

            return () => {
              controller.abort();
              transaction.abort();
            };
          }),
      ),
    );
  }
}
