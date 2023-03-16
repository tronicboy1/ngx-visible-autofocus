import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { createFamilyGuard } from './create-family.guard';

describe('createFamilyGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => createFamilyGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
