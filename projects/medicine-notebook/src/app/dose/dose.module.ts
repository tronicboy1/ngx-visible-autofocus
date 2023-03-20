import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoseRoutingModule } from './dose-routing.module';
import { DoseComponent } from './dose.component';
import { PendingDosesComponent } from './pending-doses/pending-doses.component';
import { PrescriptionsModule } from '../prescriptions/prescriptions.module';

@NgModule({
  declarations: [DoseComponent, PendingDosesComponent],
  imports: [CommonModule, DoseRoutingModule, PrescriptionsModule],
})
export class DoseModule {}
