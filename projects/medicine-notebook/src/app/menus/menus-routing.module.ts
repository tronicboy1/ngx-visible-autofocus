import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenusComponent } from './menus.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { ChangeEmailModalComponent } from './change-email-modal/change-email-modal.component';
import { AccountInfoModalComponent } from './account-info-modal/account-info-modal.component';

const routes: Routes = [
  {
    path: '',
    component: MenusComponent,
    children: [
      { path: '', component: MenuListComponent },
      { path: 'change-email', component: ChangeEmailModalComponent },
      { path: 'account-info', component: AccountInfoModalComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenusRoutingModule {}
