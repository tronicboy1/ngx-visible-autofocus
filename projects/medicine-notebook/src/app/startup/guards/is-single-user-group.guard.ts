import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { first, map, mergeMap } from 'rxjs';
import { UseMode } from '../../group/group-factory';
import { GroupService } from '../../group/group.service';

export const isSingleUserGroupGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const group = inject(GroupService);

  return auth.getUid().pipe(
    first(),
    mergeMap((uid) => group.getMembersGroup$(uid)),
    map((family) => (family && family.useMode === UseMode.SingleUser) || router.createUrlTree(['/startup'])),
  );
};
