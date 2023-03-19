import { Component, Input } from '@angular/core';
import { Prescription } from '../prescription-factory';

@Component({
  selector: 'rx-dosage-table',
  templateUrl: './dosage-table.component.html',
  styleUrls: ['./dosage-table.component.css'],
})
export class DosageTableComponent {
  @Input() dosage!: Prescription['dosage'];
}
