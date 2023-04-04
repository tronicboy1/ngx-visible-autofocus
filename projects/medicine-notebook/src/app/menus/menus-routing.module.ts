import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenusComponent } from './menus.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { ChangeEmailModalComponent } from './change-email-modal/change-email-modal.component';
import { AccountInfoModalComponent } from './account-info-modal/account-info-modal.component';
import { ChangePasswordModalComponent } from './change-password-modal/change-password-modal.component';
import { MembersModalComponent } from './members-modal/members-modal.component';

const routes: Routes = [
  {
    path: '',
    component: MenusComponent,
    children: [
      { path: '', component: MenuListComponent },
      { path: 'change-email', component: ChangeEmailModalComponent },
      { path: 'account-info', component: AccountInfoModalComponent },
      { path: 'change-password', component: ChangePasswordModalComponent },
      {
        path: 'members',
        component: MembersModalComponent,
        loadChildren: () => import('../members/members.module').then((m) => m.MembersModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenusRoutingModule {}
