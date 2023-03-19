import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canChooseModeGuard } from './can-choose-mode.guard';

describe('canChooseModeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canChooseModeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
