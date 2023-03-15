import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { setupFinishedGuard } from './setup-finished.guard';

describe('setupFinishedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => setupFinishedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
