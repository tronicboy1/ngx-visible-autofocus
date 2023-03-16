import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { createMemberGuard } from './create-member.guard';

describe('createMemberGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => createMemberGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
