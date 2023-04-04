import { Component } from '@angular/core';
import { MembersInheritable } from '../members.inheritable';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent extends MembersInheritable {}
