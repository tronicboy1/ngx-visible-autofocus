import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CloseOnEscDirective } from './custom-directives/close-on-esc.directive';
import { ObserverChildDirective } from './custom-directives/observer-child.directive';
import { SubmitOnModifierEnterDirective } from './custom-directives/submit-on-modifier-enter.directive';
import { ModalComponent } from './modal/modal.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    ModalComponent,
    SpinnerComponent,
    SubmitOnModifierEnterDirective,
    ObserverChildDirective,
    CloseOnEscDirective,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    ModalComponent,
    SpinnerComponent,
    SubmitOnModifierEnterDirective,
    ObserverChildDirective,
    CloseOnEscDirective,
  ],
})
export class NgxBaseComponentsModule {}
