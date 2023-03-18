import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Medicine } from '../../medicine-db/medicine-db.model';

@Component({
  selector: 'app-medicine-candidates',
  templateUrl: './medicine-candidates.component.html',
  styleUrls: ['./medicine-candidates.component.css'],
})
export class MedicineCandidatesComponent {
  @Input() medicines?: Medicine[];
  @Output() candidateClick = new EventEmitter<Medicine>();
}
