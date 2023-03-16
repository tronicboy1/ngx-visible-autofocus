import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { first, map, switchMap, tap } from 'rxjs';
import { FamilyService } from '../family/family.service';

/**
 * Redirect users to home if they are finished with init setup
 */
export const setupFinishedGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const family = inject(FamilyService);
  const router = inject(Router);


  return auth.getUid().pipe(
    first(),
    switchMap((uid) => family.getMembersFamily$(uid)),
    map((family) => !family || !family.memberIds.length || router.createUrlTree(['/home'])),
    tap((val) => console.log('setup finished', val))
  );
};
