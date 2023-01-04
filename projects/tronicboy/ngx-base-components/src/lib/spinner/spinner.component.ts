import { Component, Input } from '@angular/core';

@Component({
  selector: 'base-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent {
  @Input() color: 'blue' | 'white' | 'auto' = 'auto';
}
