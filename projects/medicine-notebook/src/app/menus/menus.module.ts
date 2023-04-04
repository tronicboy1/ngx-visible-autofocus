import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenusRoutingModule } from './menus-routing.module';
import { MenusComponent } from './menus.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { StartupModule } from '../startup/startup.module';
import { NgxFirebaseUserNavbarModule } from 'projects/tronicboy/ngx-firebase-user-navbar/src/public-api';
import { ChangeEmailModalComponent } from './change-email-modal/change-email-modal.component';
import { SharedModule } from '../shared/shared.module';
import { AccountInfoModalComponent } from './account-info-modal/account-info-modal.component';
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';
import { ChangePasswordModalComponent } from './change-password-modal/change-password-modal.component';
import { MembersModalComponent } from './members-modal/members-modal.component';

@NgModule({
  declarations: [
    MenusComponent,
    MenuListComponent,
    ChangeEmailModalComponent,
    AccountInfoModalComponent,
    ChangePasswordFormComponent,
    ChangePasswordModalComponent,
    MembersModalComponent,
  ],
  imports: [CommonModule, MenusRoutingModule, StartupModule, NgxFirebaseUserNavbarModule, SharedModule],
})
export class MenusModule {}
