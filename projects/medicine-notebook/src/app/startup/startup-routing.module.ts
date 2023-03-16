import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFamilyComponent } from './create-family/create-family.component';
import { CreateMemberFormComponent } from './create-member-form/create-member-form.component';
import { createFamilyGuard } from './guards/create-family.guard';
import { createMemberGuard } from './guards/create-member.guard';
import { StartupComponent } from './startup.component';

const routes: Routes = [
  {
    path: '',
    component: StartupComponent,
    children: [
      { path: 'family', component: CreateFamilyComponent, canMatch: [createFamilyGuard] },
      { path: 'members', component: CreateMemberFormComponent, canMatch: [createMemberGuard] },
      { path: '', redirectTo: 'family', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartupRoutingModule {}
