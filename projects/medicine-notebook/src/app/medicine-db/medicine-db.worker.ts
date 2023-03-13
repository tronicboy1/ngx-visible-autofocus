/// <reference lib="webworker" />

import { from, fromEvent, mergeMap } from 'rxjs';
import { DbWorker } from './db-worker';

const worker = new DbWorker();

const message$ = fromEvent<MessageEvent>(self, 'message');

message$.subscribe((event) => {
  self.postMessage('Hello you');
});

from(fetch('/assets/tp20180314-01_1.csv'))
  .pipe(
    mergeMap((result) => result.text()),
    mergeMap((csv) => {
      return worker.createDb$(csv);
    }),
  )
  .subscribe((db) => {
    console.log(db);
  });

worker.get$('1124020F4032').subscribe((result) => console.log('get res', result));

worker.search$('name', 'ラン').subscribe({ next: (res) => console.log('search res', res), complete: () => console.log('complete') });

function hiraToKana(str: string) {
  return str.replace(/[\u3041-\u3096]/g, function (match) {
    const chr = match.charCodeAt(0) + 0x60;
    return String.fromCharCode(chr);
  });
}
