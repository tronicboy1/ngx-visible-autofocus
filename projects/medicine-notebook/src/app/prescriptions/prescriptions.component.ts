import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  combineLatest,
  map,
  mergeMap,
  of,
  OperatorFunction,
  sampleTime,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { RxWithId } from './prescription-factory';
import { PrescriptionService } from './prescription.service';

enum RxDisplayMode {
  All = 1,
  Active,
  NotActive,
}

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrescriptionsComponent {
  private route = inject(ActivatedRoute);
  private rxService = inject(PrescriptionService);

  readonly RxDisplayMode = RxDisplayMode;
  readonly rxs$ = this.route.parent!.parent!.params.pipe(
    map((params) => params['memberId'] as string),
    switchMap((memberId) => this.rxService.getByMember$(memberId)),
    mergeMap((rxs) =>
      combineLatest([
        of(rxs),
        this.modeControl.valueChanges.pipe(startWith(this.modeControl.value)),
        this.searchControl.valueChanges.pipe(sampleTime(100), startWith(this.searchControl.value)),
      ]),
    ),
    this.filterRxs(),
    shareReplay(1),
  );
  readonly searchControl = new FormControl<string>('', { nonNullable: true });
  readonly modeControl = new FormControl<RxDisplayMode>(RxDisplayMode.Active, { nonNullable: true });

  private filterRxs(): OperatorFunction<[RxWithId[], RxDisplayMode, string], RxWithId[]> {
    return (source) =>
      source.pipe(
        map(([rxs, mode, searchText]) => {
          let filteredRxs: RxWithId[] = rxs;
          if (mode !== RxDisplayMode.All) {
            filteredRxs = filteredRxs.filter((rx) => {
              const today = new Date();
              const dispensedAtDate = new Date(rx.dispensedAt);
              const daysSinceDispensal = Math.floor(
                (today.getTime() - dispensedAtDate.getTime()) / (1000 * 60 * 60 * 24),
              );
              const longestMedicineAmount = rx.medicines.reduce(
                (acc, cur) => (cur.amountDispensed > acc ? cur.amountDispensed : acc),
                1,
              );
              switch (mode) {
                case RxDisplayMode.Active:
                  return longestMedicineAmount - daysSinceDispensal > 0;
                case RxDisplayMode.NotActive:
                  return longestMedicineAmount - daysSinceDispensal <= 0;
                default:
                  return true;
              }
            });
          }
          if (searchText) {
            filteredRxs = filteredRxs.filter((rx) => rx.medicines.some((med) => med.medicineName.includes(searchText)));
          }
          return filteredRxs;
        }),
      );
  }
}
