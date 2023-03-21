import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, map, Observable, sampleTime, skip, Subject, take, takeUntil } from 'rxjs';
import { Prescription, TakenAt } from '../prescription-factory';
import { PrescriptionService } from '../prescription.service';

export enum RxFormMode {
  New = 1,
  Edit,
  Readonly,
}

type DoseForm = { takenAt: FormControl<TakenAt>; amount: FormControl<number> };
export type MedicineFormGroup = FormGroup<{
  amountDispensed: FormControl<number>;
  medicineName: FormControl<string>;
  dosage: FormArray<FormGroup<DoseForm>>;
}>;

@Component({
  selector: 'rx-form',
  templateUrl: './rx-form.component.html',
  styleUrls: ['./rx-form.component.css', '../../../styles/basic-form.css'],
})
export class RxFormComponent implements OnInit, OnDestroy {
  private rxService = inject(PrescriptionService);
  @Input() memberId!: string;
  @Input() rxId?: string;
  @Input() formMode = RxFormMode.New;
  @Output() submitted = new EventEmitter<void>();
  @Output() changed = new EventEmitter<void>();

  private teardown$ = new Subject<void>();

  readonly medicineToEdit$ = new BehaviorSubject<{ group: MedicineFormGroup; index: number } | undefined>(undefined);
  readonly loading$ = new BehaviorSubject(false);
  readonly oneMonthAgo: string;
  readonly currentDate = new Date().toISOString().split('T')[0];
  readonly formGroup = new FormGroup({
    dispensedAt: new FormControl(this.currentDate, { validators: [Validators.required], nonNullable: true }),
    medicines: new FormArray<MedicineFormGroup>([], { validators: [Validators.required, Validators.min(1)] }),
    pharmacyName: new FormControl('', { nonNullable: true }),
  });
  sumbitText = $localize`追加`;

  constructor() {
    const today = new Date();
    const threeMonthAgo = new Date();
    threeMonthAgo.setMonth(today.getMonth() - 3);
    this.oneMonthAgo = threeMonthAgo.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.sumbitText = this.formMode === RxFormMode.Edit ? $localize`編集` : $localize`追加`;
    this.formGroup.valueChanges.pipe(sampleTime(300), skip(2), take(2), takeUntil(this.teardown$)).subscribe(() => {
      this.changed.emit();
    });
    if (this.rxId) {
      this.rxService.get$(this.rxId).subscribe((rx) => {
        rx.medicines.forEach((medicine, i) => {
          const group = this.addMedicine();
          group.controls.amountDispensed.setValue(medicine.amountDispensed);
          medicine.dosage.forEach((dose) => this.addDose(i, dose));
          group.controls.dosage.setValue(medicine.dosage);
          group.controls.medicineName.setValue(medicine.medicineName, { emitEvent: false });
        });
        this.formGroup.controls.pharmacyName.setValue(rx.pharmacyName);
        this.formGroup.controls.dispensedAt.setValue(new Date(rx.dispensedAt).toISOString().split('T')[0]);
      });
    } else {
      const group = this.addMedicine();
      this.openMedicineEditModal(group, 0);
      return;
    }
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
    const data = {
      dispensedAt: new Date(dispensedAt).getTime(),
      medicines,
      pharmacyName,
      memberId: this.memberId,
    };
    const send$: Observable<any> =
      this.formMode === RxFormMode.Edit && this.rxId
        ? this.rxService.update$(this.rxId, data)
        : this.rxService.create$(data);
    send$.subscribe({
      next: () => {
        this.submitted.emit();
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
