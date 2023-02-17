import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [ModalComponent, SpinnerComponent],
  imports: [CommonModule, RouterModule],
  exports: [ModalComponent, SpinnerComponent],
})
export class NgxBaseComponentsModule {}
