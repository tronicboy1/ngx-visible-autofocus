import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { hasActiveRxGuard } from './guards/has-active-rx.guard';
import { redirectCurrentUserMemberGuard } from './guards/redirect-current-user-member.guard';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', canMatch: [redirectCurrentUserMemberGuard], component: HomeComponent },
  { path: 'members', pathMatch: 'full', redirectTo: '' },
  {
    path: 'members/:memberId',
    component: HomeComponent,
    children: [
      {
        path: 'doses',
        canActivate: [hasActiveRxGuard],
        loadChildren: () => import('../dose/dose.module').then((m) => m.DoseModule),
      },
      {
        path: 'prescriptions',
        loadChildren: () => import('../prescriptions/prescriptions.module').then((m) => m.PrescriptionsModule),
      },
      { path: '', redirectTo: 'doses', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
