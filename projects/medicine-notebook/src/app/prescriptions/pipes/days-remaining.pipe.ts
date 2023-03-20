import { Pipe, PipeTransform } from '@angular/core';
import { PrescriptionService } from '../prescription.service';

@Pipe({
  name: 'daysRemaining',
})
export class DaysRemainingPipe implements PipeTransform {
  transform(amountDispensed: number, dispensedAt: number): number {
    const daysRemaining = PrescriptionService.getDaysRemainingForMedicine(dispensedAt, amountDispensed);
    return daysRemaining >= 0 ? daysRemaining : 0;
  }
}
