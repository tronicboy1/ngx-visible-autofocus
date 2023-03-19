import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, first, map, mergeMap, of } from 'rxjs';
import { Prescription, TakenAt } from '../../prescription-factory';
import { PrescriptionService } from '../../prescription.service';

type DoseForm = { takenAt: FormControl<TakenAt>; amount: FormControl<number> };
type MedicineForm = {
  amountDispensed: FormControl<number>;
  medicineName: FormControl<string>;
  dosage: FormArray<FormGroup<DoseForm>>;
};

@Component({
  selector: 'rx-new-rx-form',
  templateUrl: './new-rx-form.component.html',
  styleUrls: ['./new-rx-form.component.css', '../../../../styles/basic-form.css'],
})
export class NewRxFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private rxService = inject(PrescriptionService);

  private readonly memberId$ = this.route.parent!.parent!.parent!.params.pipe(
    map((params) => params['memberId'] as string),
  );
  readonly loading$ = new BehaviorSubject(false);
  readonly TakenAt = TakenAt;
  readonly TakenAtValues: TakenAt[] = Object.values(TakenAt).filter((val): val is TakenAt => !isNaN(Number(val)));
  readonly oneMonthAgo: string;
  readonly currentDate = new Date().toISOString().split('T')[0];
  readonly formGroup = new FormGroup({
    dispensedAt: new FormControl(this.currentDate, { validators: [Validators.required], nonNullable: true }),
    medicines: new FormArray<
      FormGroup<{
        amountDispensed: FormControl<number>;
        medicineName: FormControl<string>;
        dosage: FormArray<FormGroup<DoseForm>>;
      }>
    >([]),
    pharmacyName: new FormControl('', { nonNullable: true }),
  });
  private readonly rxId$ = this.route.queryParams.pipe(map((params) => params['rxId'] as string | undefined));

  constructor() {
    const today = new Date();
    const threeMonthAgo = new Date();
    threeMonthAgo.setMonth(today.getMonth() - 3);
    this.oneMonthAgo = threeMonthAgo.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.rxId$
      .pipe(
        first(),
        mergeMap((rxId) => (rxId ? this.rxService.get$(rxId) : of(undefined))),
      )
      .subscribe((rx) => {
        if (!rx) {
          this.addMedicine();
          this.addDose(0);
          return;
        }
        rx.medicines.forEach((medicine, i) => {
          const group = this.addMedicine();
          group.controls.amountDispensed.setValue(medicine.amountDispensed);
          medicine.dosage.forEach((dose) => this.addDose(i, dose));
          group.controls.medicineName.setValue(medicine.medicineName, { emitEvent: false });
        });
        this.formGroup.controls.pharmacyName.setValue(rx.pharmacyName);
      });
  }

  addMedicine(params?: Partial<Prescription['medicines'][0]>) {
    const medicineGroup = this.createMedicineFormGroup();
    this.formGroup.controls.medicines.push(medicineGroup);
    return medicineGroup;
  }
  addDose(i: number, params?: Prescription['medicines'][0]['dosage'][0]) {
    const doseGroup = new FormGroup<DoseForm>({
      takenAt: new FormControl(params?.takenAt ?? TakenAt.Morning, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      amount: new FormControl(params?.amount ?? 1, {
        validators: [Validators.required, Validators.min(1), Validators.max(99)],
        nonNullable: true,
      }),
    });
    this.formGroup.controls.medicines.at(i).controls.dosage.push(doseGroup);
    return doseGroup;
  }

  handleSubmit() {
    if (this.loading$.value) return;
    const { dispensedAt, medicines, pharmacyName } = this.formGroup.getRawValue();
    this.loading$.next(true);
    const parsedMedicines: Prescription['medicines'] = medicines.map((medicine) => {
      const dosageMap = new Map(medicine.dosage.map((dose) => [dose.takenAt, dose]));
      const dosageUnique = Array.from(dosageMap.values());
      return { ...medicine, dosage: dosageUnique };
    });

    console.log({
      dispensedAt: new Date(dispensedAt).getTime(),
      medicines,
      pharmacyName,
    });
    this.memberId$
      .pipe(
        first(),
        mergeMap((memberId) =>
          this.rxService.create$({
            dispensedAt: new Date(dispensedAt).getTime(),
            medicines: parsedMedicines,
            pharmacyName,
            memberId,
          }),
        ),
      )
      .subscribe({
        next: () => this.router.navigate([''], { relativeTo: this.route.parent }),
      });
  }

  private createMedicineFormGroup() {
    return new FormGroup({
      amountDispensed: new FormControl(7, {
        validators: [Validators.required, Validators.min(1), Validators.max(365)],
        nonNullable: true,
      }),
      medicineName: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(255)],
        nonNullable: true,
      }),
      dosage: new FormArray<FormGroup<DoseForm>>([], { validators: [Validators.required] }),
    });
  }
}
