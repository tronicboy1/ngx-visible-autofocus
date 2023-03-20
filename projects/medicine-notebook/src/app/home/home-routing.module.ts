import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentDosesComponent } from './current-doses/current-doses.component';
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
        path: 'current-doses',
        canActivate: [hasActiveRxGuard],
        component: CurrentDosesComponent,
      },
      {
        path: 'prescriptions',
        loadChildren: () => import('../prescriptions/prescriptions.module').then((m) => m.PrescriptionsModule),
      },
      { path: '', redirectTo: 'current-doses', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
