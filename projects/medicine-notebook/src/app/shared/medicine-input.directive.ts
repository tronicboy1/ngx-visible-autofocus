import { Directive, inject } from '@angular/core';
import { MedicineDbService } from '../medicine-db/medicine-db.service';
import { Medicine } from '../medicine-db/medicine-factory';
import { InferInputDirective } from './infer-input.directive';

/**
 * Adds a dropdown to an input for possible candidates based on input
 */
@Directive({
  selector: '[appMedicineInput]',
})
export class MedicineInputDirective extends InferInputDirective<Medicine> {
  protected searchService = inject(MedicineDbService);
}
