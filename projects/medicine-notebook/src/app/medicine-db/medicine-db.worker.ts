/// <reference lib="webworker" />

import { from, fromEvent, map, mergeMap } from 'rxjs';
import { DbWorker } from './db-worker';

const message$ = fromEvent<MessageEvent>(self, 'message');

message$.subscribe((event) => {
  self.postMessage('Hello you');
});

from(fetch('/assets/tp20180314-01_1.csv'))
  .pipe(
    mergeMap((result) => result.text()),
    mergeMap((csv) => {
      const worker = new DbWorker();
      return worker.createDb(csv);
    })
  )
  .subscribe((db) => {
    console.log(db);
  });
