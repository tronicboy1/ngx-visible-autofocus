import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css'],
})
export class CandidatesComponent<T extends { name: string }> {
  @Input() candidates?: T[];
  @Output() candidateClick = new EventEmitter<T>();

  handleClick(clicked: T) {
    this.candidateClick.emit(clicked);
  }
}
