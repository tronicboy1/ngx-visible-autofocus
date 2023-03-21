import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoseHistoryComponent } from './dose-history/dose-history.component';
import { DoseComponent } from './dose.component';
import { PendingDosesComponent } from './pending-doses/pending-doses.component';

const routes: Routes = [
  {
    path: '',
    component: DoseComponent,
    children: [
      { path: 'pending', component: PendingDosesComponent },
      { path: 'history', component: DoseHistoryComponent },
      { path: '', pathMatch: 'full', redirectTo: 'pending' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoseRoutingModule {}
