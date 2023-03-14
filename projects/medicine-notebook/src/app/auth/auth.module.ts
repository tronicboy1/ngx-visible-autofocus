import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { NgxFirebaseUserPlatformModule } from 'projects/ngx-firebase-user-platform/src/public-api';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, AuthRoutingModule, NgxFirebaseUserPlatformModule],
})
export class AuthModule {}
