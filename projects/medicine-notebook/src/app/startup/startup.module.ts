import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartupRoutingModule } from './startup-routing.module';
import { StartupComponent } from './startup.component';

@NgModule({
  declarations: [StartupComponent],
  imports: [CommonModule, StartupRoutingModule],
})
export class StartupModule {}
