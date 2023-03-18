import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-medicine-candidates',
  templateUrl: './medicine-candidates.component.html',
  styleUrls: ['./medicine-candidates.component.css'],
})
export class MedicineCandidatesComponent<T extends { name: string }> {
  @Input() candidates?: T[];
  @Output() candidateClick = new EventEmitter<T>();
}
