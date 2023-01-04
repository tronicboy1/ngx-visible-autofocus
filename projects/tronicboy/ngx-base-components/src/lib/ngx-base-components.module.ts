import { NgModule } from '@angular/core';
import { ModalComponent } from './modal/modal.component';
import { AccountCircleComponent } from './nav-bar/account-circle/account-circle.component';
import { AccountDetailsFormComponent } from './nav-bar/account-circle/account-details-form/account-details-form.component';
import { ChangeAvatarFormComponent } from './nav-bar/account-circle/change-avatar-form/change-avatar-form.component';
import { ChangeEmailFormComponent } from './nav-bar/account-circle/change-email-form/change-email-form.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    ModalComponent,
    NavBarComponent,
    AccountCircleComponent,
    ChangeEmailFormComponent,
    ChangeAvatarFormComponent,
    AccountDetailsFormComponent,
    SpinnerComponent,
  ],
  imports: [],
  exports: [ModalComponent, NavBarComponent, SpinnerComponent],
})
export class NgxBaseComponentsModule {}
