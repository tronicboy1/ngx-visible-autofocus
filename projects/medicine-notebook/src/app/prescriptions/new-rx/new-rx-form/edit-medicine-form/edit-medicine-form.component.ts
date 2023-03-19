import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Prescription, TakenAt } from '../../../prescription-factory';
import { MedicineFormGroup } from '../new-rx-form.component';

type DoseForm = { takenAt: FormControl<TakenAt>; amount: FormControl<number> };

@Component({
  selector: 'rx-edit-medicine-form',
  templateUrl: './edit-medicine-form.component.html',
  styleUrls: ['./edit-medicine-form.component.css','../new-rx-form.component.css', '../../../../../styles/basic-form.css'],
})
export class EditMedicineFormComponent implements OnInit {
  @Input() group!: MedicineFormGroup;
  @Output() close = new EventEmitter<void>();
  readonly TakenAt = TakenAt;
  readonly TakenAtValues: TakenAt[] = Object.values(TakenAt).filter((val): val is TakenAt => !isNaN(Number(val)));

  ngOnInit() {
    if (!this.group.controls.dosage.length) {
      this.addDose();
    }
  }

  addDose(params?: Prescription['medicines'][0]['dosage'][0]) {
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
    this.group.controls.dosage.push(doseGroup);
    return doseGroup;
  }
}
