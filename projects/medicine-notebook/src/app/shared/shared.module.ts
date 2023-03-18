import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MedicineInputDirective } from './medicine-input.directive';
import { CandidatesComponent } from './candidates/candidates.component';

@NgModule({
  declarations: [MedicineInputDirective, CandidatesComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CommonModule, ReactiveFormsModule, MedicineInputDirective],
})
export class SharedModule {}
