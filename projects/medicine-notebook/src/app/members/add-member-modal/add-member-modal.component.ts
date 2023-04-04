import { Component, inject } from '@angular/core';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { map, switchMap } from 'rxjs';
import { GroupService } from '../../group/group.service';
import { RelativeRoutingInheritable } from '../relative-routing.inheritable';

@Component({
  selector: 'startup-add-member-modal',
  templateUrl: './add-member-modal.component.html',
  styleUrls: ['./add-member-modal.component.css'],
})
export class AddMemberModalComponent extends RelativeRoutingInheritable{
  private auth = inject(AuthService);
  private group = inject(GroupService);

  readonly isFirstMember$ = this.auth.getUid().pipe(
    switchMap((uid) => this.group.getGroupByUid$(uid)),
    map((group) => group && group.memberIds.length === 0),
  );
  readonly modalTitle$ = this.isFirstMember$.pipe(
    map((isFirstMember) => (isFirstMember ? $localize`自信の情報を追加する` : $localize`家族の一員を追加する`)),
  );
}
