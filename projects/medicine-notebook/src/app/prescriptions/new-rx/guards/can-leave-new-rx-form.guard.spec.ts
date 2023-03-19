import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { canLeaveNewRxFormGuard } from './can-leave-new-rx-form.guard';

describe('canLeaveNewRxFormGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canLeaveNewRxFormGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
