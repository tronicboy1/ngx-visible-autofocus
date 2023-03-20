import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { BehaviorSubject, finalize, first, ReplaySubject, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment';

enum AuthMode {
  Login = 1,
  Register,
  EmailLogin,
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  static errorMessages = new Map([
    ['auth/user-not-found', $localize`メールアドレスは登録されていません`],
    ['auth/wrong-password', $localize`パスワードが間違っています`],
  ]);
  private authService = inject(AuthService);
  private router = inject(Router);

  readonly AuthMode = AuthMode;
  readonly mode$ = new BehaviorSubject(AuthMode.Login);
  readonly loading$ = new BehaviorSubject(false);
  readonly loginFormGroup = new FormGroup({
    email: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    password: new FormControl('', { validators: [Validators.required, Validators.minLength(8)], nonNullable: true }),
  });
  readonly error$ = new ReplaySubject<string>(1);

  changeMode(mode: AuthMode) {
    this.mode$.next(mode);
  }

  handleSubmit() {
    if (this.loading$.getValue()) return;
    const { email, password } = this.loginFormGroup.value;
    if (!email) return;
    this.loading$.next(true);
    this.error$.next('');
    this.mode$
      .pipe(
        first(),
        switchMap((mode) => {
          switch (mode) {
            case AuthMode.Login:
              return this.authService.signInUser(email, password!);
            case AuthMode.Register:
              return this.authService.createUser(email.trim(), password!.trim());
            case AuthMode.EmailLogin:
              const url = new URL('auth/email-login', environment.url);
              url.searchParams.set('email', email);
              return this.authService.sendSignInEmail(email, url.toString());
            default:
              throw Error();
          }
        }),
        finalize(() => this.loading$.next(false)),
      )
      .subscribe({
        next: () => {
          {
            this.router.navigate(['/']);
          }
        },
        error: (error: FirebaseError) => {
          this.loginFormGroup.controls.password.reset('');
          this.error$.next(AuthComponent.errorMessages.get(error.code) ?? error.message);
        },
      });
  }
}
