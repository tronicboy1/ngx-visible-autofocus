import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TakenAt } from '../../../prescription-factory';
import { MedicineFormGroup } from '../new-rx-form.component';

@Component({
  selector: 'rx-edit-medicine-form',
  templateUrl: './edit-medicine-form.component.html',
  styleUrls: [
    './edit-medicine-form.component.css',
    '../new-rx-form.component.css',
    '../../../../../styles/basic-form.css',
  ],
})
export class EditMedicineFormComponent implements OnInit {
  @Input() group!: MedicineFormGroup;
  @Output() close = new EventEmitter<void>();
  @Output() addDose = new EventEmitter<void>();
  readonly TakenAt = TakenAt;
  readonly TakenAtValues: TakenAt[] = Object.values(TakenAt).filter((val): val is TakenAt => !isNaN(Number(val)));

  ngOnInit() {
    if (!this.group.controls.dosage.length) {
      this.addDose.emit();
    }
  }
}
