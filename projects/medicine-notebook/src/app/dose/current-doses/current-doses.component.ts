import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Prescription, takenAtIntervals } from '../../prescriptions/prescription-factory';
import { PrescriptionService } from '../../prescriptions/prescription.service';

type ActiveDose = Prescription['medicines'][0]['dosage'][0] & { medicineName: string };

@Component({
  selector: 'doses-current-doses',
  templateUrl: './current-doses.component.html',
  styleUrls: ['./current-doses.component.css'],
})
export class CurrentDosesComponent {
  private route = inject(ActivatedRoute);
  private rxService = inject(PrescriptionService);

  private readonly memberId$ = this.route.params.pipe(map((params) => params['memberId'] as string));
  private readonly rxs$ = this.memberId$.pipe(switchMap((memberId) => this.rxService.getByMember$(memberId)));
  private readonly activeMedicines$ = this.rxs$.pipe(
    map((rxs) =>
      rxs.reduce((acc, curr) => {
        const activeMedicines = curr.medicines.filter(
          (med) => PrescriptionService.getDaysRemainingForMedicine(curr.dispensedAt, med.amountDispensed) > 0,
        );
        return [...acc, ...activeMedicines];
      }, [] as Prescription['medicines']),
    )
  );
  readonly currentDoses$ = this.activeMedicines$.pipe(
    map((medicines) =>
      medicines.reduce((doses, med) => {
        const hourNow = new Date().getHours();
        const activeDoses = med.dosage.reduce<ActiveDose | undefined>((activeDose, dose) => {
          if (activeDose) return activeDose;
          const [from, to] = takenAtIntervals.get(dose.takenAt) ?? [0, 0];
          const isActiveDose = hourNow >= from && hourNow <= to;
          return isActiveDose ? { ...dose, medicineName: med.medicineName } : undefined;
        }, undefined);
        if (!activeDoses) return doses;
        return [...doses, activeDoses];
      }, [] as ActiveDose[]),
    ),
  );
}
