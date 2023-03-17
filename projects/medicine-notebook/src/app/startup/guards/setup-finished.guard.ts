import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { first, map, switchMap } from 'rxjs';
import { GroupService } from '../../group/group.service';

let setupFinished = false;

/**
 * Redirect users to home if they are finished with init setup
 */
export const setupFinishedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (setupFinished) return router.createUrlTree(['/home']);
  const auth = inject(AuthService);
  const group = inject(GroupService);
  return auth.getUid().pipe(
    first(),
    switchMap((uid) => group.getMembersGroup$(uid)),
    map((group) => !(setupFinished ||= Boolean(group?.setupCompleted)) || router.createUrlTree(['/home'])),
  );
};
