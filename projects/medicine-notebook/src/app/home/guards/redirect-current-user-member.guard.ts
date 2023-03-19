import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { first, map, mergeMap, tap } from 'rxjs';
import { MemberService } from '../../group/member.service';

export const redirectCurrentUserMemberGuard: CanMatchFn = (_route, _segments) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const member = inject(MemberService);
  return auth.getUid().pipe(
    first(),
    mergeMap((uid) => member.getMemberByUid$(uid)),
    map(
      (member) =>
        (member && router.createUrlTree(['/home', 'members', member.id])) || false,
    ),
    tap(console.log),
  );
};
