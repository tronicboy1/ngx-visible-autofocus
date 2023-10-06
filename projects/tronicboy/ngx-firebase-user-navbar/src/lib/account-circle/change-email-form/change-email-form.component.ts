import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { AuthService } from 'ngx-firebase-user-platform';
import { InheritableAccountDetailsComponent } from '../inheritable-account-details-component';

@Component({
  selector: 'app-change-email-form',
  templateUrl: './change-email-form.component.html',
  styleUrls: ['./change-email-form.component.css'],
})
export class ChangeEmailFormComponent {
  private authService = inject(AuthService);
  public loading$ = signal(false);
  @Output() submitted = new EventEmitter<null>();

  public handleSubmit: EventListener = (event) => {
    const { formData } = InheritableAccountDetailsComponent.getFormData(event);
    const newEmail = formData.get('new-email')!.toString().trim();
    this.loading$.set(true);
    this.authService
      .changeEmail(newEmail)
      .then(() => this.submitted.emit(null))
      .catch(console.error)
      .finally(() => this.loading$.set(false));
  };
}
