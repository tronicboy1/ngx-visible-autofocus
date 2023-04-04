import { Component } from '@angular/core';
import { RelativeRoutingInheritable } from '../relative-routing.inheritable';

@Component({
  selector: 'app-members-modal',
  templateUrl: './members-modal.component.html',
  styleUrls: ['./members-modal.component.css'],
})
export class MembersModalComponent extends RelativeRoutingInheritable {}
