import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { first, map, switchMap } from 'rxjs';
import { GroupService } from '../../group/group.service';

export const createGroupGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const group = inject(GroupService);
  const router = inject(Router);

  const hasUseMode = Number(route.queryParams['useMode']);
  if (!hasUseMode) return router.createUrlTree(['/startup', 'choose-mode']);
  return auth.getUid().pipe(
    first(),
    switchMap((uid) => group.getGroupByUid$(uid)),
    map(Boolean),
    map((hasGroup) => !hasGroup || router.createUrlTree(['/startup', 'members'])),
  );
};
