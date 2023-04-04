import { Component } from '@angular/core';
import { RelativeRoutingInheritable } from '../relative-routing.inheritable';

@Component({
  selector: 'app-change-email-modal',
  templateUrl: './change-email-modal.component.html',
  styleUrls: ['./change-email-modal.component.css'],
})
export class ChangeEmailModalComponent extends RelativeRoutingInheritable {}
