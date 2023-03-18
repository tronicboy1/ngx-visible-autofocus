import { Pipe, PipeTransform } from '@angular/core';
import { TakenAt } from '../prescription-factory';

@Pipe({
  name: 'takenAt',
})
export class TakenAtPipe implements PipeTransform {
  transform(value: TakenAt): string {
    switch (value) {
      case TakenAt.WhenWoken:
        return $localize`起`;
      case TakenAt.Morning:
        return $localize`朝`;
      case TakenAt.Lunch:
        return $localize`昼`;
      case TakenAt.Dinner:
        return $localize`夕`;
      case TakenAt.BeforeBed:
        return $localize`寝`;
      case TakenAt.Other:
        return $localize`他`;
      default:
        throw ReferenceError('TakenAtNotFound');
    }
  }
}
