import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { first, map, switchMap } from 'rxjs';
import { UseMode } from '../../group/group-factory';
import { GroupService } from '../../group/group.service';

export const createMemberGuard: CanActivateFn = (_route, _segments) => {
  const auth = inject(AuthService);
  const group = inject(GroupService);
  const router = inject(Router);
  return auth.getUid().pipe(
    first(),
    switchMap((uid) => group.getMembersGroup$(uid)),
    map((group) => {
      if (!group) return router.createUrlTree(['/startup', 'group']);
      if (group.useMode === UseMode.SingleUser) return router.createUrlTree(['/startup', 'single-user']);
      return true;
    }),
  );
};
