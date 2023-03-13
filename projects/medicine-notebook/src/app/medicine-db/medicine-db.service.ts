import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { DbWorker } from './db-worker';

@Injectable({
  providedIn: 'root',
})
export class MedicineDbService {
  worker?: Worker;
  message$: Observable<MessageEvent> = new Observable();

  constructor() {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(
        new URL('./medicine-db.worker', import.meta.url)
      );
      this.message$ = fromEvent<MessageEvent>(this.worker, 'message');
      this.worker.postMessage('hello');
    }
    this.message$.subscribe((event) => {
      console.log('message from worker', event.data);
      const worker = new DbWorker();

    });
  }
}
