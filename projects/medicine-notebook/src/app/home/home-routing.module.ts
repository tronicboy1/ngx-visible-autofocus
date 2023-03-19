import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { redirectCurrentUserMemberGuard } from './guards/redirect-current-user-member.guard';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', canMatch: [redirectCurrentUserMemberGuard], component: HomeComponent },
  {
    path: 'members/:memberId',
    component: HomeComponent,
    children: [
      {
        path: 'members/:memberId/prescriptions',
        loadChildren: () => import('../prescriptions/prescriptions.module').then((m) => m.PrescriptionsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
