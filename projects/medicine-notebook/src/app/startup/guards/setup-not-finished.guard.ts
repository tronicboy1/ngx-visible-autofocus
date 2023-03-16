import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { first, map, switchMap } from 'rxjs';
import { GroupService } from '../../group/group.service';

/**
 * Redirect users to startup if they are NOT finished with init setup
 */
export const setupNotFinishedGuard: CanActivateFn = (_route, _state) => {
  const auth = inject(AuthService);
  const group = inject(GroupService);
  const router = inject(Router);

  return auth.getUid().pipe(
    first(),
    switchMap((uid) => group.getMembersGroup$(uid)),
    map((group) => group?.setupCompleted || router.createUrlTree(['/startup'])),
  );
};
