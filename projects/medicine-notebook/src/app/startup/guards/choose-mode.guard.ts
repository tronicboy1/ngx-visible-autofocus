import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { first, map, switchMap } from 'rxjs';
import { FamilyService } from '../../family/family.service';

export const chooseModeGuard: CanMatchFn = (route, segments) => {
  const auth = inject(AuthService);
  const family = inject(FamilyService);
  const router = inject(Router);
  return auth.getUid().pipe(
    first(),
    switchMap((uid) => family.getMembersFamily$(uid)),
    map((family) => {
      if (!family) return router.createUrlTree(['/startup', 'family']);
      if (family.useMode) return router.createUrlTree(['/startup', 'members']);
      return true;
    }),
  );
};
