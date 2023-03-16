import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { first, map, switchMap } from 'rxjs';
import { GroupService } from '../../group/group.service';

export const chooseModeGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const group = inject(GroupService);
  const router = inject(Router);
  return auth.getUid().pipe(
    first(),
    switchMap((uid) => group.getMembersGroup$(uid)),
    map((group) => {
      if (group && group.useMode) return router.createUrlTree(['/startup', 'members']);
      if (route.queryParams['useMode'])
        return router.createUrlTree(['/startup', 'group'], { queryParamsHandling: 'preserve' });
      return true;
    }),
  );
};
