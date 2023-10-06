import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar.component';
import { AccountCircleComponent } from './account-circle/account-circle.component';
import { ChangeAvatarFormComponent } from './account-circle/change-avatar-form/change-avatar-form.component';
import { ChangeEmailFormComponent } from './account-circle/change-email-form/change-email-form.component';
import { AccountDetailsFormComponent } from './account-circle/account-details-form/account-details-form.component';
import { RouterModule } from '@angular/router';
import { NgxBaseComponentsModule } from '@tronicboy/ngx-base-components';

@NgModule({
  declarations: [
    NavBarComponent,
    AccountCircleComponent,
    ChangeAvatarFormComponent,
    ChangeEmailFormComponent,
    AccountDetailsFormComponent,
  ],
  exports: [
    NavBarComponent,
    AccountCircleComponent,
    ChangeAvatarFormComponent,
    ChangeEmailFormComponent,
    AccountDetailsFormComponent,
  ],
  imports: [CommonModule, NgxBaseComponentsModule, RouterModule],
})
export class NgxFirebaseUserNavbarModule {}
