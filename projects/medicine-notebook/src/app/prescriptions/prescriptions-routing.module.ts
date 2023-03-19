import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditRxComponent } from './edit-rx/edit-rx.component';
import { ChooseRxAddModeComponent } from './new-rx/choose-rx-add-mode/choose-rx-add-mode.component';
import { canChooseModeGuard } from './new-rx/guards/can-choose-mode.guard';
import { NewRxContainerComponent } from './new-rx/new-rx-container/new-rx-container.component';
import { NewRxComponent } from './new-rx/new-rx.component';
import { SelectRxComponent } from './new-rx/select-rx/select-rx.component';
import { PrescriptionsComponent } from './prescriptions.component';
import { canLeaveRxFormGuard } from './rx-form/can-leave-rx-form.guard';

const routes: Routes = [
  { path: '', component: PrescriptionsComponent },
  {
    path: 'add',
    component: NewRxComponent,
    children: [
      { path: 'mode', component: ChooseRxAddModeComponent, canActivate: [canChooseModeGuard] },
      { path: 'select', component: SelectRxComponent, canActivate: [canChooseModeGuard] },
      { path: 'new', component: NewRxContainerComponent, canDeactivate: [canLeaveRxFormGuard] },
      { path: '', pathMatch: 'full', redirectTo: 'mode' },
    ],
  },
  {
    path: 'edit/:rxId',
    component: EditRxComponent,
    canDeactivate: [canLeaveRxFormGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrescriptionsRoutingModule {}
