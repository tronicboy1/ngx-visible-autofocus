import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { PrescriptionService } from '../../prescriptions/prescription.service';

export const hasActiveRxGuard: CanActivateFn = (route, state) => {
  const memberId = route.parent!.params['memberId'];
  const rxService = inject(PrescriptionService);
  const router = inject(Router);
  return rxService.getByMember$(memberId).pipe(
    map((rxs) =>
      rxs.filter((rx) => {
        const daysRemaining = PrescriptionService.getDaysRemainingForRx(rx);
        return daysRemaining > 0;
      }),
    ),
    map(
      (hasActiveRx) =>
        !!hasActiveRx.length || router.createUrlTree(['/home', 'members', memberId, 'prescriptions', 'add', 'mode']),
    ),
  );
};
