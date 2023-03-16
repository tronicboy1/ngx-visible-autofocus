import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { createGroupGuard } from './create-group.guard';

describe('createGroupGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => createGroupGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
