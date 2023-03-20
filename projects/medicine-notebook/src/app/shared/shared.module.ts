import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MedicineInputDirective } from './medicine-input.directive';
import { CandidatesComponent } from './candidates/candidates.component';
import { NgxBaseComponentsModule } from 'projects/tronicboy/ngx-base-components/src/public-api';
import { NgxVisibleAutofocusModule } from 'projects/ngx-visible-autofocus/src/public-api';

@NgModule({
  declarations: [MedicineInputDirective, CandidatesComponent],
  imports: [CommonModule, ReactiveFormsModule, NgxBaseComponentsModule, NgxVisibleAutofocusModule],
  exports: [CommonModule, ReactiveFormsModule, MedicineInputDirective, NgxBaseComponentsModule, NgxVisibleAutofocusModule],
})
export class SharedModule {}
