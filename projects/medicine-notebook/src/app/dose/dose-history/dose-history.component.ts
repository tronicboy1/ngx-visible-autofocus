import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, map, of, switchMap, withLatestFrom } from 'rxjs';
import { TakenAt, takenAtIntervals } from '../../prescriptions/prescription-factory';
import { PrescriptionService, RxFilterMode } from '../../prescriptions/prescription.service';
import { DoseAdministrationService } from '../dose-administration.service';

enum DoseHistory {
  Taken = 1,
  Forgotten,
  NotNecessary,
}

@Component({
  selector: 'app-dose-history',
  templateUrl: './dose-history.component.html',
  styleUrls: ['./dose-history.component.css'],
})
export class DoseHistoryComponent {
  private route = inject(ActivatedRoute);
  private rxService = inject(PrescriptionService);
  private administrationService = inject(DoseAdministrationService);

  private readonly memberId$ = this.route.params.pipe(map((params) => params['memberId'] as string));
  private readonly activeRxs$ = this.memberId$.pipe(
    switchMap((memberId) => this.rxService.getByMember$(memberId)),
    PrescriptionService.filterByActivityOperator(RxFilterMode.Active),
  );

  readonly DoseHistory = DoseHistory;
  readonly activeRxsWithAdministrations$ = this.activeRxs$.pipe(
    switchMap((rxs) =>
      forkJoin(rxs.map((rx) => this.administrationService.getByRxId$(rx.id).pipe(withLatestFrom(of(rx))))),
    ),
    map((rxsWithAdmin) =>
      rxsWithAdmin.map(([administrations, rx]) => {
        const adminsUniqueByDay = administrations.reduce((acc, curr) => {
          const completedAtDate = new Date(curr.completedAt);
          const key = completedAtDate.toISOString().split('T')[0];
          const hasOther = acc.get(key)?.takenAt ?? [];
          return acc.set(key, { date: completedAtDate, takenAt: [...hasOther, curr.takenAt] });
        }, new Map<string, { date: Date; takenAt: TakenAt[] }>());
        const requiredAdministrations = rx.medicines.reduce((acc, med) => {
          const empty = PrescriptionService.getDaysRemainingForMedicine(rx.dispensedAt, med.amountDispensed) < 1;
          if (empty) return acc;
          const allDoseTimesForMedicine = med.dosage.reduce((acc, dose) => [...acc, dose.takenAt], [] as TakenAt[]);
          return [...acc, ...allDoseTimesForMedicine];
        }, [] as TakenAt[]);
        const takenAtKeys = Object.values(TakenAt).filter((value): value is TakenAt => !isNaN(Number(value)));
        const historyResults: {
          date: Date;
          results: DoseHistory[];
        }[] = [];
        const hoursNow = new Date().getHours();
        adminsUniqueByDay.forEach((admin) => {
          const history = takenAtKeys.map((key) => {
            const wasRequired = requiredAdministrations.includes(key);
            const wasAdministered = admin.takenAt.includes(key);
            const isToday = Date.now() - admin.date.getTime() < 1000 * 60 * 60 * 24;
            const [_, to] = takenAtIntervals.get(key) ?? [0, 0];
            const stillNotTimeToTake = isToday && hoursNow < to;

            switch (true) {
              case wasRequired && wasAdministered:
                return DoseHistory.Taken;
              case !stillNotTimeToTake && wasRequired && !wasAdministered:
                return DoseHistory.Forgotten;
              default:
                return DoseHistory.NotNecessary;
            }
          });
          historyResults.push({ date: admin.date, results: history });
        });
        historyResults.sort((a, b) => a.date.getTime() - b.date.getTime());
        return {
          ...rx,
          doseHistory: historyResults,
        };
      }),
    ),
  );
}
