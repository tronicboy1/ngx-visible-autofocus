import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SexPipe } from './pipes/sex.pipe';
import { DiseaseHistoryPipe } from './pipes/disease-history.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [SexPipe, DiseaseHistoryPipe],
  exports: [SexPipe, DiseaseHistoryPipe],
})
export class GroupModule {}
