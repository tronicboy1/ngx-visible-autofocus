import { Component, inject } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { MemberService } from '../../group/member.service';
import { RelativeRoutingInheritable } from '../relative-routing.inheritable';

@Component({
  selector: 'startup-edit-member-modal',
  templateUrl: './edit-member-modal.component.html',
  styleUrls: ['./edit-member-modal.component.css'],
})
export class EditMemberModalComponent extends RelativeRoutingInheritable {
  private member = inject(MemberService);

  readonly memberId$ = this.route.params.pipe(map((params) => params['memberId']));
  readonly modalTitle$ = this.memberId$.pipe(
    switchMap((memberId) => this.member.get$(memberId)),
    map((member) => $localize`${member.name}さんの情報を編集する`),
  );
}
