import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoseRoutingModule } from './dose-routing.module';
import { DoseComponent } from './dose.component';
import { CurrentDosesComponent } from './current-doses/current-doses.component';

@NgModule({
  declarations: [DoseComponent, CurrentDosesComponent],
  imports: [CommonModule, DoseRoutingModule],
})
export class DoseModule {}
