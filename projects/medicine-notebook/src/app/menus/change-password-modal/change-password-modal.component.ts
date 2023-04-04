import { Component } from '@angular/core';
import { RelativeRoutingInheritable } from '../relative-routing.inheritable';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.css'],
})
export class ChangePasswordModalComponent extends RelativeRoutingInheritable {}
