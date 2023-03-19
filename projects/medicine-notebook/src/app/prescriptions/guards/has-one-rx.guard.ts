import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PrescriptionService } from '../prescription.service';

export const hasOneRxGuard: CanActivateFn = (route, state) => {
  const { memberId } = route.params;
  const router = inject(Router);
  const rx = inject(PrescriptionService);
  return true;
};
