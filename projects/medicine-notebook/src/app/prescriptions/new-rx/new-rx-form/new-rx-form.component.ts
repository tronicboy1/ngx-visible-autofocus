import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, first, map, mergeMap, of } from 'rxjs';
import { Prescription, TakenAt } from '../../prescription-factory';
import { PrescriptionService } from '../../prescription.service';

type DoseForm = { takenAt: FormControl<TakenAt>; amount: FormControl<number> };
export type MedicineFormGroup = FormGroup<{
  amountDispensed: FormControl<number>;
  medicineName: FormControl<string>;
  dosage: FormArray<FormGroup<DoseForm>>;
}>;

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
  readonly medicineToEdit$ = new BehaviorSubject<{ group: MedicineFormGroup; index: number } | undefined>(undefined);
  readonly loading$ = new BehaviorSubject(false);
  readonly oneMonthAgo: string;
  readonly currentDate = new Date().toISOString().split('T')[0];
  readonly formGroup = new FormGroup({
    dispensedAt: new FormControl(this.currentDate, { validators: [Validators.required], nonNullable: true }),
    medicines: new FormArray<MedicineFormGroup>([], { validators: [Validators.required, Validators.min(1)] }),
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
          const group = this.addMedicine();
          this.openMedicineEditModal(group, 0);
          return;
        }
        rx.medicines.forEach((medicine, i) => {
          const group = this.addMedicine();
          group.controls.amountDispensed.setValue(medicine.amountDispensed);
          //medicine.dosage.forEach((dose) => this.addDose(i, dose));
          group.controls.dosage.setValue(medicine.dosage);
          group.controls.medicineName.setValue(medicine.medicineName, { emitEvent: false });
        });
        this.formGroup.controls.pharmacyName.setValue(rx.pharmacyName);
      });
  }

  addMedicine(openModal = false) {
    const medicineGroup = this.createMedicineFormGroup();
    this.formGroup.controls.medicines.push(medicineGroup);
    if (openModal) {
      this.medicineToEdit$.next({ group: medicineGroup, index: -1 });
    }
    return medicineGroup;
  }

  openMedicineEditModal(group: MedicineFormGroup, index: number) {
    this.medicineToEdit$.next({ group, index });
  }
  closeMedicineEditModal(group: MedicineFormGroup, index: number) {
    if (group.invalid) {
      this.formGroup.controls.medicines.removeAt(index);
    }
    this.medicineToEdit$.next(undefined);
  }
  removeMedicine(index: number) {
    this.medicineToEdit$.next(undefined);
    this.formGroup.controls.medicines.removeAt(index);
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
