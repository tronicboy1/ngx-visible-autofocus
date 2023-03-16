import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMemberModalComponent } from './add-member-modal/add-member-modal.component';
import { AddMembersComponent } from './add-members/add-members.component';
import { CreateFamilyComponent } from './create-family/create-family.component';
import { createFamilyGuard } from './guards/create-family.guard';
import { createMemberGuard } from './guards/create-member.guard';
import { StartupComponent } from './startup.component';

const routes: Routes = [
  {
    path: '',
    component: StartupComponent,
    children: [
      { path: 'family', component: CreateFamilyComponent, canMatch: [createFamilyGuard] },
      {
        path: 'members',
        component: AddMembersComponent,
        canMatch: [createMemberGuard],
        children: [{ path: 'add', component: AddMemberModalComponent }],
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
