import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, first, map, mergeMap, of, sampleTime, skip, Subject, take, takeUntil } from 'rxjs';
import { Prescription, TakenAt } from '../../prescription-factory';
import { PrescriptionService } from '../../prescription.service';
import { NewRxEditStateService } from '../new-rx-edit-state.service';

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
export class NewRxFormComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private rxService = inject(PrescriptionService);
  private newRxEditStateService = inject(NewRxEditStateService);

  private teardown$ = new Subject<void>();
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
    this.formGroup.valueChanges.pipe(sampleTime(300), skip(1), take(1), takeUntil(this.teardown$)).subscribe(() => {
      this.newRxEditStateService.set(this, true);
    });
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
          medicine.dosage.forEach((dose) => this.addDose(i, dose));
          group.controls.dosage.setValue(medicine.dosage);
          group.controls.medicineName.setValue(medicine.medicineName, { emitEvent: false });
        });
        this.formGroup.controls.pharmacyName.setValue(rx.pharmacyName);
      });
  }

  ngOnDestroy(): void {
    this.teardown$.next();
  }

  addMedicine(openModal = false) {
    const medicineGroup = this.createMedicineFormGroup();
    this.formGroup.controls.medicines.push(medicineGroup);
    if (openModal) {
      this.medicineToEdit$.next({ group: medicineGroup, index: -1 });
    }
    return medicineGroup;
  }
  addDose(index: number, params?: Prescription['medicines'][0]['dosage'][0]) {
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
    this.formGroup.controls.medicines.at(index).controls.dosage.push(doseGroup);
    return doseGroup;
  }

  openMedicineEditModal(group: MedicineFormGroup, index: number) {
    this.medicineToEdit$.next({ group, index });
  }
  closeMedicineEditModal(group: MedicineFormGroup) {
    if (!this.medicineToEdit$.value) throw Error();
    if (group.invalid) {
      this.removeMedicine(this.medicineToEdit$.value.index);
    }
    this.medicineToEdit$.next(undefined);
  }
  removeMedicine(index: number) {
    this.formGroup.controls.medicines.removeAt(index);
  }

  handleSubmit() {
    if (this.loading$.value) return;
    const { dispensedAt, medicines, pharmacyName } = this.formGroup.getRawValue();
    this.loading$.next(true);
    this.memberId$
      .pipe(
        first(),
        mergeMap((memberId) =>
          this.rxService.create$({
            dispensedAt: new Date(dispensedAt).getTime(),
            medicines,
            pharmacyName,
            memberId,
          }),
        ),
      )
      .subscribe({
        next: () => {
          this.newRxEditStateService.set(this, false);
          this.router.navigate([''], { relativeTo: this.route.parent });
        },
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
