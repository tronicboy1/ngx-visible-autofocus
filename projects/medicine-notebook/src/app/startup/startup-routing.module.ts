import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMemberDetailsModalComponent } from './add-member-details-modal/add-member-details-modal.component';
import { AddMemberModalComponent } from './add-member-modal/add-member-modal.component';
import { AddMembersComponent } from './add-members/add-members.component';
import { ChooseModeComponent } from './choose-mode/choose-mode.component';
import { CreateFamilyComponent } from './create-family/create-family.component';
import { canCloseAddMemberModalGuard } from './guards/can-close-add-member-modal.guard';
import { chooseModeGuard } from './guards/choose-mode.guard';
import { createFamilyGuard } from './guards/create-family.guard';
import { createMemberGuard } from './guards/create-member.guard';
import { SingleUserRegisterComponent } from './single-user-register/single-user-register.component';
import { StartupComponent } from './startup.component';

const routes: Routes = [
  {
    path: '',
    component: StartupComponent,
    children: [
      { path: 'family', component: CreateFamilyComponent, canMatch: [createFamilyGuard] },
      { path: 'choose-mode', component: ChooseModeComponent, canMatch: [chooseModeGuard] },
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
      { path: '', redirectTo: 'family', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartupRoutingModule {}
