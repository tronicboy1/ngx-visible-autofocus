import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MedicineInputDirective } from './medicine-input.directive';
import { MedicineCandidatesComponent } from './medicine-candidates/medicine-candidates.component';

@NgModule({
  declarations: [MedicineInputDirective, MedicineCandidatesComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CommonModule, ReactiveFormsModule, MedicineInputDirective],
})
export class SharedModule {}
