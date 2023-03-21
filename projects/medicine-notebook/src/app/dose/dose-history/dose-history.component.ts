import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, map, of, switchMap, withLatestFrom } from 'rxjs';
import { TakenAt } from '../../prescriptions/prescription-factory';
import { PrescriptionService, RxFilterMode } from '../../prescriptions/prescription.service';
import { DoseAdministrationService } from '../dose-administration.service';

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
  readonly activeRxsWithAdministrations$ = this.activeRxs$.pipe(
    switchMap((rxs) =>
      forkJoin(rxs.map((rx) => this.administrationService.getByRxId$(rx.id).pipe(withLatestFrom(of(rx))))),
    ),
    map((rxsWithAdmin) =>
      rxsWithAdmin.map(([administrations, rx]) => {
        const adminsUniqueByDay = administrations.reduce((acc, curr) => {
          const completedAtDate = new Date(curr.completedAt);
          const key = `${completedAtDate.getDay()}-${completedAtDate.getMonth()}`;
          const hasOther = acc.get(key)?.takenAt ?? [];
          return acc.set(key, { date: completedAtDate, takenAt: [...hasOther, curr.takenAt] });
        }, new Map<string, { date: Date; takenAt: TakenAt[] }>());
        return {
          ...rx,
          administrations: Array.from(adminsUniqueByDay.values()),
        };
      }),
    ),
  );
}
