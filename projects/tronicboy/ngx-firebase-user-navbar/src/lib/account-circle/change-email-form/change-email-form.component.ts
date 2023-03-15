import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { BehaviorSubject } from 'rxjs';
import { InheritableAccountDetailsComponent } from '../inheritable-account-details-component';

@Component({
  selector: 'app-change-email-form',
  templateUrl: './change-email-form.component.html',
  styleUrls: ['./change-email-form.component.css'],
})
export class ChangeEmailFormComponent {
  private authService = inject(AuthService);
  public loading$ = new BehaviorSubject(false);
  @Output() submitted = new EventEmitter<null>();

  public handleSubmit: EventListener = (event) => {
    const { formData } = InheritableAccountDetailsComponent.getFormData(event);
    const newEmail = formData.get('new-email')!.toString().trim();
    this.loading$.next(true);
    this.authService
      .changeEmail(newEmail)
      .then(() => this.submitted.emit(null))
      .catch(console.error)
      .finally(() => this.loading$.next(false));
  };
}
