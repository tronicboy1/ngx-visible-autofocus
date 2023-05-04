import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';

@Component({
  selector: 'app-password-reset-form',
  templateUrl: './password-reset-form.component.html',
  styleUrls: ['./password-reset-form.component.css', '../auth.component.css'],
})
export class PasswordResetFormComponent {
  private authService = inject(AuthService);
  @Output() submitted = new EventEmitter<void>();
  readonly loading$ = signal(false);

  readonly formGroup = new FormGroup({
    email: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  });

  handleResetPasswordSubmit() {
    if (this.loading$()) return;
    const { email } = this.formGroup.value;
    if (!email) return;
    this.loading$.set(true);
    this.authService.sendPasswordResetEmail(email.trim()).finally(() => {
      this.submitted.emit();
    });
  }
}
