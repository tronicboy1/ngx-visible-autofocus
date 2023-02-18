import { Component, OnDestroy, OnInit } from '@angular/core';
import '@web-components/loading-spinner';
import { InheritableAccountDetailsComponent } from '../inheritable-account-details-component';

@Component({
  selector: 'app-account-details-form',
  templateUrl: './account-details-form.component.html',
  styleUrls: [
    './account-details-form.component.css',
    '../../../../../../../projects/tronicboy/ngx-base-components/styles/basic-form.css',
  ],
})
export class AccountDetailsFormComponent
  extends InheritableAccountDetailsComponent
  implements OnInit, OnDestroy
{
  private photoPreview?: string;
  get photoURL(): string | undefined {
    if (this.photoPreview) return this.photoPreview;
    if (this.user?.photoURL) return this.user.photoURL;
    return undefined;
  }

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
