import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { first, map, switchMap } from 'rxjs';
import { GroupService } from '../../group/group.service';

export const createGroupGuard: CanMatchFn = (route, segments) => {
  const auth = inject(AuthService);
  const group = inject(GroupService);
  const router = inject(Router);
  return auth.getUid().pipe(
    first(),
    switchMap((uid) => group.getMembersGroup$(uid)),
    map(Boolean),
    map((hasGroup) => !hasGroup || router.createUrlTree(['/startup', 'choose-mode'])),
  );
};
