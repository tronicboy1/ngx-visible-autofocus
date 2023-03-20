import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  combineLatest,
  first,
  forkJoin,
  map,
  mergeMap,
  of,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Prescription, TakenAt, takenAtIntervals } from '../../prescriptions/prescription-factory';
import { PrescriptionService } from '../../prescriptions/prescription.service';
import { DoseAdministrationService } from '../dose-administration.service';

type ActiveDose = Prescription['medicines'][0]['dosage'][0] & { medicineName: string; rxId: string };

@Component({
  selector: 'doses-pending-doses',
  templateUrl: './pending-doses.component.html',
  styleUrls: ['./pending-doses.component.css'],
})
export class PendingDosesComponent {
  private route = inject(ActivatedRoute);
  private rxService = inject(PrescriptionService);
  private doseAdministrationService = inject(DoseAdministrationService);
  private refreshSubject = new Subject<void>();
  private refresh$ = this.refreshSubject.pipe(startWith(undefined));

  private readonly memberId$ = this.route.params.pipe(map((params) => params['memberId'] as string));
  private readonly rxs$ = this.memberId$.pipe(switchMap((memberId) => this.rxService.getByMember$(memberId)));
  private readonly activeMedicines$ = this.rxs$.pipe(
    map((rxs) =>
      rxs.reduce((acc, curr) => {
        const activeMedicines = curr.medicines.filter(
          (med) => PrescriptionService.getDaysRemainingForMedicine(curr.dispensedAt, med.amountDispensed) > 0,
        );
        return [...acc, ...activeMedicines.map((med) => ({ ...med, rxId: curr.id }))];
      }, [] as (Prescription['medicines'][0] & { rxId: string })[]),
    ),
  );
  readonly currentDoses$ = this.activeMedicines$.pipe(
    map((medicines) =>
      medicines.reduce((doses, med) => {
        const hourNow = new Date().getHours();
        const activeDoses = med.dosage.reduce<ActiveDose | undefined>((activeDose, dose) => {
          if (activeDose) return activeDose;
          const [from, to] = takenAtIntervals.get(dose.takenAt) ?? [0, 0];
          const isActiveDose = hourNow >= from && hourNow <= to;
          return isActiveDose ? { ...dose, medicineName: med.medicineName, rxId: med.rxId } : undefined;
        }, undefined);
        if (!activeDoses) return doses;
        return [...doses, activeDoses];
      }, [] as ActiveDose[]),
    ),
    shareReplay(1),
  );
  readonly unfinishedDoses$ = this.refresh$.pipe(
    switchMap(() => this.currentDoses$),
    switchMap((doses) =>
      forkJoin(
        doses.map((dose) =>
          this.doseAdministrationService
            .getByRxIdAndTakeAtTypeForToday$(dose.rxId, dose.takenAt)
            .pipe(withLatestFrom(of(dose))),
        ),
      ),
    ),
    map((doses) =>
      doses.reduce(
        (acc, [administrations, dose]) => (administrations.length ? acc : [...acc, dose]),
        [] as ActiveDose[],
      ),
    ),
    shareReplay(1),
  );

  addAdministrationForRxMedicines() {
    combineLatest([this.memberId$, this.unfinishedDoses$])
      .pipe(
        first(),
        map(([memberId, doses]) => {
          const uniqueRxIds = new Set<string>(doses.map((dose) => dose.rxId));
          return [memberId, Array.from(uniqueRxIds), doses.at(0)!.takenAt] as const;
        }),
        switchMap(([memberId, rxIds, takenAt]) =>
          forkJoin([rxIds.map((rxId) => this.doseAdministrationService.create$(memberId, rxId, takenAt))]),
        ),
      )
      .subscribe(() => this.refreshSubject.next());
  }
}
