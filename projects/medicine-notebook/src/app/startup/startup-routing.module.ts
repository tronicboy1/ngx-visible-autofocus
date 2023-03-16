import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMemberDetailsModalComponent } from './add-member-details-modal/add-member-details-modal.component';
import { AddMemberModalComponent } from './add-member-modal/add-member-modal.component';
import { AddMembersComponent } from './add-members/add-members.component';
import { ChooseModeComponent } from './choose-mode/choose-mode.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { canCloseAddMemberModalGuard } from './guards/can-close-add-member-modal.guard';
import { chooseModeGuard } from './guards/choose-mode.guard';
import { createGroupGuard } from './guards/create-group.guard';
import { createMemberGuard } from './guards/create-member.guard';
import { SingleUserRegisterComponent } from './single-user-register/single-user-register.component';
import { StartupComponent } from './startup.component';

const routes: Routes = [
  {
    path: '',
    component: StartupComponent,
    children: [
      { path: 'choose-mode', component: ChooseModeComponent, canActivate: [chooseModeGuard] },
      { path: 'group', component: CreateGroupComponent, canActivate: [createGroupGuard] },
      {
        path: 'members',
        component: AddMembersComponent,
        canMatch: [createMemberGuard],
        children: [
          { path: 'add', component: AddMemberModalComponent, canDeactivate: [canCloseAddMemberModalGuard] },
          { path: 'add-details/:memberId', component: AddMemberDetailsModalComponent },
        ],
      },
      {
        path: 'single-user',
        component: SingleUserRegisterComponent,
      },
      { path: '', redirectTo: 'group', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartupRoutingModule {}
