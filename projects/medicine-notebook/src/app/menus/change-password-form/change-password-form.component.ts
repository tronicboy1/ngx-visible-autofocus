import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css', '../../../styles/basic-form.css'],
})
export class ChangePasswordFormComponent {
  @Output() submitted = new EventEmitter<void>();
  private auth = inject(AuthService);

  readonly formGroup = new FormGroup({
    password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    passwordConfirm: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  });

  handleSubmit() {
    const { password, passwordConfirm } = this.formGroup.getRawValue();
    if (password !== passwordConfirm) return;
    this.auth.changePassword(password).then(() => this.submitted.emit());
  }
}
