import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoseRoutingModule } from './dose-routing.module';
import { DoseComponent } from './dose.component';
import { PendingDosesComponent } from './pending-doses/pending-doses.component';
import { PrescriptionsModule } from '../prescriptions/prescriptions.module';
import { DoseHistoryComponent } from './dose-history/dose-history.component';
import { SharedModule } from '../shared/shared.module';
import { AddForgottenDoseComponent } from './add-forgotten-dose/add-forgotten-dose.component';

@NgModule({
  declarations: [DoseComponent, PendingDosesComponent, DoseHistoryComponent, AddForgottenDoseComponent],
  imports: [CommonModule, DoseRoutingModule, PrescriptionsModule, SharedModule],
})
export class DoseModule {}
