import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { chooseModeGuard } from './choose-mode.guard';

describe('chooseModeGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => chooseModeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
