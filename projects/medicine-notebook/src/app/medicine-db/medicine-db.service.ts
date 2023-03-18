import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { AbstractSearchService } from '../shared/search-service.abstract';
import { Medicine } from './medicine-factory';

@Injectable({
  providedIn: 'root',
})
export class MedicineDbService implements AbstractSearchService<Medicine> {
  worker?: Worker;
  message$: Observable<MessageEvent<string[]>> = new Observable();

  constructor() {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('./medicine-db.worker', import.meta.url));
      this.message$ = fromEvent<MessageEvent>(this.worker, 'message');
    }
  }

  search$(text: string) {
    return new Observable<Medicine[]>((observer) => {
      if (!this.worker) throw ReferenceError();
      this.worker.addEventListener(
        'message',
        ({ data }) => {
          observer.next(data);
          observer.complete();
        },
        { once: true },
      );
      this.worker.postMessage(text);
    });
  }
}
