import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { PrescriptionService } from '../../prescription.service';

export const canChooseModeGuard: CanActivateFn = (route, state) => {
  const memberId = route.parent!.parent!.parent!.params['memberId'] as string;
  const rxService = inject(PrescriptionService);
  const router = inject(Router);
  return rxService
    .getByMember$(memberId)
    .pipe(map((rxs) => (rxs.length ? true : router.createUrlTree([...state.url.split('/').slice(0, -1), 'new']))));
};
