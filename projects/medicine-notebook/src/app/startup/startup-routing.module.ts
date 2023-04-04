import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMembersComponent } from './add-members/add-members.component';
import { ChooseModeComponent } from './choose-mode/choose-mode.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { chooseModeGuard } from './guards/choose-mode.guard';
import { createGroupGuard } from './guards/create-group.guard';
import { createMemberGuard } from './guards/create-member.guard';
import { isSingleUserGroupGuard } from './guards/is-single-user-group.guard';
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
        canActivate: [createMemberGuard],
        loadChildren: () => import('../members/members.module').then((m) => m.MembersModule),
      },
      {
        path: 'single-user',
        component: SingleUserRegisterComponent,
        canActivate: [isSingleUserGroupGuard],
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
