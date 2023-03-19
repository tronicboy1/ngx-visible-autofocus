import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrescriptionsRoutingModule } from './prescriptions-routing.module';
import { PrescriptionsComponent } from './prescriptions.component';
import { TakenAtPipe } from './pipes/taken-at.pipe';
import { AmountPipe } from './pipes/amount.pipe';
import { DosageTableComponent } from './dosage-table/dosage-table.component';
import { DaysRemainingPipe } from './pipes/days-remaining.pipe';
import { NewRxComponent } from './new-rx/new-rx.component';

@NgModule({
  declarations: [PrescriptionsComponent, TakenAtPipe, AmountPipe, DosageTableComponent, DaysRemainingPipe, NewRxComponent],
  imports: [CommonModule, PrescriptionsRoutingModule],
})
export class PrescriptionsModule {}
