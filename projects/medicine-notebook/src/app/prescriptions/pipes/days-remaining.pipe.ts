import { Pipe, PipeTransform } from '@angular/core';
import { Prescription } from '../prescription-factory';

@Pipe({
  name: 'daysRemaining',
})
export class DaysRemainingPipe implements PipeTransform {
  transform(value: Prescription): number {
    const today = new Date();
    const dispensedAtDate = new Date(value.dispensedAt);
    const daysSinceDispensal = Math.ceil((today.getTime() - dispensedAtDate.getTime()) / (1000 * 60 * 60 * 24));
    return value.amountDispensed - daysSinceDispensal;
  }
}
