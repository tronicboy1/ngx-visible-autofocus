import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { first, map, switchMap } from 'rxjs';
import { FamilyService } from '../../family/family.service';
import { MemberService } from '../../family/member.service';

export const canCloseAddMemberModalGuard: CanDeactivateFn<unknown> = (
  _component,
  _currentRoute,
  _currentState,
  _nextState,
) => {
  const auth = inject(AuthService);
  const family = inject(FamilyService);
  const member = inject(MemberService);
  return auth.getUid().pipe(
    first(),
    switchMap((uid) => family.getMembersFamily$(uid)),
    map((family) => {
      if (!family) throw ReferenceError('NoFamily');
      return family;
    }),
    switchMap((family) => member.getFamilyMembers$(family.id)),
    map((members) => members.length > 0),
  );
};
