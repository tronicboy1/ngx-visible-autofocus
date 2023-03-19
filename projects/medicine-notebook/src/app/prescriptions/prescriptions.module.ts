import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrescriptionsRoutingModule } from './prescriptions-routing.module';
import { PrescriptionsComponent } from './prescriptions.component';
import { TakenAtPipe } from './pipes/taken-at.pipe';
import { AmountPipe } from './pipes/amount.pipe';
import { DosageTableComponent } from './dosage-table/dosage-table.component';
import { DaysRemainingPipe } from './pipes/days-remaining.pipe';
import { NewRxComponent } from './new-rx/new-rx.component';
import { ChooseRxAddModeComponent } from './new-rx/choose-rx-add-mode/choose-rx-add-mode.component';
import { NewRxFormComponent } from './new-rx/new-rx-form/new-rx-form.component';
import { SelectRxComponent } from './new-rx/select-rx/select-rx.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PrescriptionsComponent,
    TakenAtPipe,
    AmountPipe,
    DosageTableComponent,
    DaysRemainingPipe,
    NewRxComponent,
    ChooseRxAddModeComponent,
    NewRxFormComponent,
    SelectRxComponent,
  ],
  imports: [CommonModule, PrescriptionsRoutingModule, SharedModule],
})
export class PrescriptionsModule {}
