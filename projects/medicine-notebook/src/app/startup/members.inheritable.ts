import { inject } from '@angular/core';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { map, shareReplay, switchMap } from 'rxjs';
import { GroupService } from '../group/group.service';
import { MemberService } from '../group/member.service';

export abstract class MembersInheritable {
  protected auth = inject(AuthService);
  protected group = inject(GroupService);
  protected member = inject(MemberService);

  protected group$ = this.auth.getUid().pipe(
    switchMap((uid) => this.group.getGroupByUid$(uid)),
    map((group) => {
      if (!group) throw ReferenceError('NoGroup');
      return group;
    }),
  );
  readonly members$ = this.member.refresh$.pipe(
    switchMap(() => this.group$),
    switchMap((group) => this.member.getGroupMembers$(group.id)),
    shareReplay(1),
  );
}
