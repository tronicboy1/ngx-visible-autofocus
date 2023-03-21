import { Component, Input } from '@angular/core';
import { Prescription } from '../../prescriptions/prescription-factory';

@Component({
  selector: 'app-rx-header',
  templateUrl: './rx-header.component.html',
  styleUrls: ['./rx-header.component.css'],
})
export class RxHeaderComponent {
  @Input() rx!: Prescription;
}
