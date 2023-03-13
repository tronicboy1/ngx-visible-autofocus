import { mergeMap, Observable, of } from 'rxjs';

export type Medicines = Map<string, Medicine>;

interface Medicine {
  name: string;
  code: string;
  manufacturer: string;
  generic: boolean;
}

export class DbWorker {
  static dbName = 'MedicineDatabase';
  static storeName = 'medicines';
  static version = 1;

  createDb(csvRaw: string) {
    const medicines = this.parseRawCsv(csvRaw);
    return this.getDb$().pipe(
      mergeMap(({ db, needsUpgrade }) =>
        needsUpgrade ? this.upgradeDb$(db, medicines) : of(db)
      )
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

  private getDb$() {
    return new Observable<{ db: IDBDatabase; needsUpgrade: boolean }>(
      (observer) => {
        const controller = new AbortController();
        const request = indexedDB.open(DbWorker.dbName, DbWorker.version);
        request.addEventListener(
          'success',
          (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            observer.next({ db, needsUpgrade: false });
            observer.complete();
          },
          { signal: controller.signal }
        );
        request.addEventListener(
          'upgradeneeded',
          (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            observer.next({ db, needsUpgrade: true });
            observer.complete();
          },
          { signal: controller.signal }
        );
        request.addEventListener('error', () => observer.error(), {
          signal: controller.signal,
        });
        return () => controller.abort();
      }
    );
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
        { signal: controller.signal }
      );
      objectStore.transaction.addEventListener(
        'error',
        () => observer.error(),
        { signal: controller.signal }
      );

      objectStore.createIndex('code', 'code', { unique: true });
      objectStore.createIndex('name', 'name', { unique: false });

      return () => {
        controller.abort();
        objectStore.transaction.abort();
      };
    }).pipe(
      mergeMap(
        (db) =>
          new Observable((observer) => {
            const controller = new AbortController();
            const transaction = db.transaction(DbWorker.storeName, 'readwrite');
            transaction.addEventListener(
              'complete',
              () => {
                observer.next(db);
                observer.complete();
              },
              { signal: controller.signal }
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
          })
      )
    );
  }
}
