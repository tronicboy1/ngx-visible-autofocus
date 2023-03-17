import { Component } from '@angular/core';
import { map } from 'rxjs';
import { InheritableAccountDetailsComponent } from '../inheritable-account-details-component';

@Component({
  selector: 'app-account-details-form',
  templateUrl: './account-details-form.component.html',
  styleUrls: [
    './account-details-form.component.css',
    '../../../../../../../projects/tronicboy/ngx-base-components/styles/basic-form.css',
  ],
})
export class AccountDetailsFormComponent extends InheritableAccountDetailsComponent {
  private photoPreview?: string;

  readonly photoUrl$ = this.user$.pipe(map((user) => this.photoPreview || user.photoURL));

  public handleSubmit: EventListener = (event) => {
    const { formData } = InheritableAccountDetailsComponent.getFormData(event);
    const displayName = formData.get('display-name')!.toString().trim();
    this.loading = true;
    this.authService
      .updateAccount({ displayName })
      .then(() => this.submitted.emit(null))
      .catch(console.error)
      .finally(() => (this.loading = false));
  };
}
