import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentDosesComponent } from './current-doses/current-doses.component';
import { DoseComponent } from './dose.component';

const routes: Routes = [
  {
    path: '',
    component: DoseComponent,
    children: [
      { path: 'pending', component: CurrentDosesComponent },
      { path: '', pathMatch: 'full', redirectTo: 'pending' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoseRoutingModule {}
