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
import { SelectRxComponent } from './new-rx/select-rx/select-rx.component';
import { SharedModule } from '../shared/shared.module';
import { EditMedicineFormComponent } from './rx-form/edit-medicine-form/edit-medicine-form.component';
import { RxFormComponent } from './rx-form/rx-form.component';
import { NewRxContainerComponent } from './new-rx/new-rx-container/new-rx-container.component';
import { EditRxComponent } from './edit-rx/edit-rx.component';

@NgModule({
  declarations: [
    PrescriptionsComponent,
    TakenAtPipe,
    AmountPipe,
    DosageTableComponent,
    DaysRemainingPipe,
    NewRxComponent,
    ChooseRxAddModeComponent,
    RxFormComponent,
    SelectRxComponent,
    EditMedicineFormComponent,
    NewRxContainerComponent,
    EditRxComponent,
  ],
  imports: [CommonModule, PrescriptionsRoutingModule, SharedModule],
  exports: [TakenAtPipe],
})
export class PrescriptionsModule {}
