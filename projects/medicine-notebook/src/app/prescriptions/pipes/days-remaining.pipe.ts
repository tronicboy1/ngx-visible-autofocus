import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysRemaining',
})
export class DaysRemainingPipe implements PipeTransform {
  transform(amountDispensed: number, dispensedAt: number): number {
    const today = new Date();
    const dispensedAtDate = new Date(dispensedAt);
    const daysSinceDispensal = Math.floor((today.getTime() - dispensedAtDate.getTime()) / (1000 * 60 * 60 * 24));
    return amountDispensed - daysSinceDispensal;
  }
}
