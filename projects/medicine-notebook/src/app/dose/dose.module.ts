import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoseRoutingModule } from './dose-routing.module';
import { DoseComponent } from './dose.component';
import { PendingDosesComponent } from './pending-doses/pending-doses.component';

@NgModule({
  declarations: [DoseComponent, PendingDosesComponent],
  imports: [CommonModule, DoseRoutingModule],
})
export class DoseModule {}
