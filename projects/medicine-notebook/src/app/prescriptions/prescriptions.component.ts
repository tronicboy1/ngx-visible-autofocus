import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
} from 'rxjs';
import { RxWithId } from './prescription-factory';
import { PrescriptionService, RxFilterMode } from './prescription.service';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrescriptionsComponent {
  private route = inject(ActivatedRoute);
  private rxService = inject(PrescriptionService);

  readonly RxFilterMode = RxFilterMode;
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
  readonly modeControl = new FormControl<RxFilterMode>(RxFilterMode.Active, { nonNullable: true });

  private filterRxs(): OperatorFunction<[RxWithId[], RxFilterMode, string], RxWithId[]> {
    return (source) =>
      source.pipe(
        map(([rxs, mode, searchText]) => {
          let filteredRxs: RxWithId[] = PrescriptionService.filterByActivity(rxs, mode);
          if (searchText) {
            filteredRxs = filteredRxs.filter((rx) => rx.medicines.some((med) => med.medicineName.includes(searchText)));
          }
          return filteredRxs;
        }),
      );
  }
}
