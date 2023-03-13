import { Observable } from 'rxjs';

export class DbWorker {
  static dbName = 'MedicineDatabase';
  static version = 1;

  createDb(csvRaw: string) {
    const medicines = this.parseRawCsv(csvRaw);
    console.log('parse res:', medicines);

    return this.getDb$();
  }

  private parseRawCsv(csvRaw: string): Map<string, string[]> {
    const endOfFirstLine = csvRaw.indexOf('\n');
    const body = csvRaw.slice(endOfFirstLine + 1);
    const rows = body.split('\n');
    const rowsWithColumns = rows.map((row) => row.split(','));
    return rowsWithColumns.reduce(
      (acc, current) => acc.set(current[7], current),
      new Map<string, string[]>()
    );
  }

  private getDb$() {
    return new Observable<IDBDatabase>((observer) => {
      const controller = new AbortController();
      const request = indexedDB.open(DbWorker.dbName, DbWorker.version);
      request.addEventListener(
        'success',
        (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          observer.next(db);
          observer.complete();
        },
        { signal: controller.signal }
      );
      request.addEventListener('error', () => observer.error(), {
        signal: controller.signal,
      });
      return () => controller.abort();
    });
  }
}
