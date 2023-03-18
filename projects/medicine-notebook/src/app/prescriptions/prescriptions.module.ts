import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrescriptionsRoutingModule } from './prescriptions-routing.module';
import { PrescriptionsComponent } from './prescriptions.component';
import { TakenAtPipe } from './pipes/taken-at.pipe';
import { AmountPipe } from './pipes/amount.pipe';

@NgModule({
  declarations: [PrescriptionsComponent, TakenAtPipe, AmountPipe],
  imports: [CommonModule, PrescriptionsRoutingModule],
})
export class PrescriptionsModule {}
