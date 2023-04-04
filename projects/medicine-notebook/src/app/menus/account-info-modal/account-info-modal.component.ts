import { Component } from '@angular/core';
import { RelativeRoutingInheritable } from '../relative-routing.inheritable';

@Component({
  selector: 'app-account-info-modal',
  templateUrl: './account-info-modal.component.html',
  styleUrls: ['./account-info-modal.component.css'],
})
export class AccountInfoModalComponent extends RelativeRoutingInheritable {}
