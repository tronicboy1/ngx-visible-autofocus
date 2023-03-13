/// <reference lib="webworker" />

import { from, fromEvent, mergeMap, switchMap } from 'rxjs';
import { DbWorker } from './db-worker';

const worker = new DbWorker();

const message$ = fromEvent<MessageEvent<string>>(self, 'message');

message$.pipe(switchMap(({ data }) => worker.search$('name', hiraToKana(data)))).subscribe((results) => {
  self.postMessage(results);
});

from(fetch('/assets/tp20180314-01_1.csv'))
  .pipe(
    mergeMap((result) => result.text()),
    mergeMap((csv) => worker.createDb$(csv)),
  )
  .subscribe();

function hiraToKana(str: string): string {
  const isHiragana = /[\u3040-\u309f]/.test(str);
  return isHiragana
    ? str.replace(/[\u3041-\u3096]/g, function (match) {
        const chr = match.charCodeAt(0) + 0x60;
        return String.fromCharCode(chr);
      })
    : str;
}
