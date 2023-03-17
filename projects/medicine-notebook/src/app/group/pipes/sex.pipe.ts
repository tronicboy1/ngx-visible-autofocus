import { Pipe, PipeTransform } from '@angular/core';
import { Sex } from '../member-factory';

@Pipe({
  name: 'sex',
})
export class SexPipe implements PipeTransform {
  transform(value: Sex, ...args: unknown[]): string {
    switch (value) {
      case Sex.Female:
        return $localize`女性`;
      case Sex.Male:
        return $localize`男性`;
      case Sex.Q:
        return $localize`その他`;
    }
  }
}
