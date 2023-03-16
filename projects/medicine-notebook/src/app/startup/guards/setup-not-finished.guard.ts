import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { first, map, switchMap } from 'rxjs';
import { FamilyService } from '../../family/family.service';

/**
 * Redirect users to startup if they are NOT finished with init setup
 */
export const setupNotFinishedGuard: CanActivateFn = (_route, _state) => {
  const auth = inject(AuthService);
  const family = inject(FamilyService);
  const router = inject(Router);

  return auth.getUid().pipe(
    first(),
    switchMap((uid) => family.getMembersFamily$(uid)),
    map((family) => family?.setupCompleted || router.createUrlTree(['/startup'])),
  );
};
