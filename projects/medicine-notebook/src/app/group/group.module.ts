import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SexPipe } from './pipes/sex.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [SexPipe],
  exports: [SexPipe],
})
export class GroupModule {}
