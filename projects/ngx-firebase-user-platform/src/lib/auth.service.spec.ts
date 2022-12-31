import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { NgxFirebaseUserPlatformModule } from './ngx-firebase-user-platform.module';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxFirebaseUserPlatformModule],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
