import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { NgxFirebaseUserPlatformModule } from 'projects/ngx-firebase-user-platform/src/public-api';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxBaseComponentsModule } from 'projects/tronicboy/ngx-base-components/src/public-api';
import { PasswordResetFormComponent } from './password-reset-form/password-reset-form.component';
import { PasswordResetModalComponent } from './password-reset-modal/password-reset-modal.component';

@NgModule({
  declarations: [AuthComponent, PasswordResetFormComponent, PasswordResetModalComponent],
  imports: [CommonModule, AuthRoutingModule, NgxFirebaseUserPlatformModule, ReactiveFormsModule, NgxBaseComponentsModule],
})
export class AuthModule {}
