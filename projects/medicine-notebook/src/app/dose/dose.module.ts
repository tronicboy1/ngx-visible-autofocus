import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoseRoutingModule } from './dose-routing.module';
import { DoseComponent } from './dose.component';
import { PendingDosesComponent } from './pending-doses/pending-doses.component';
import { PrescriptionsModule } from '../prescriptions/prescriptions.module';
import { DoseHistoryComponent } from './dose-history/dose-history.component';

@NgModule({
  declarations: [DoseComponent, PendingDosesComponent, DoseHistoryComponent],
  imports: [CommonModule, DoseRoutingModule, PrescriptionsModule],
})
export class DoseModule {}
