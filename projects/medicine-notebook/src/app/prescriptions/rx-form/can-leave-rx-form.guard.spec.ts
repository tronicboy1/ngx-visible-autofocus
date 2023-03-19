import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';
import { canLeaveRxFormGuard } from './can-leave-rx-form.guard';

describe('canLeaveNewRxFormGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => canLeaveRxFormGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
