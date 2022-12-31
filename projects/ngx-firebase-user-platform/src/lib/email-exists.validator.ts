import { inject, Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import {
  catchError,
  filter,
  map,
  Observable,
  of,
  OperatorFunction,
  sampleTime,
  switchMap,
  take,
} from 'rxjs';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class EmailExistsValidator implements AsyncValidator {
  private userService = inject(UserService);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const { value } = control;
    if (typeof value !== 'string') throw TypeError('V');
    return control.valueChanges.pipe(
      filter((value) => typeof value === 'string') as OperatorFunction<
        any,
        string
      >,
      sampleTime(100),
      take(1),
      switchMap((value) => this.userService.getUserByEmail(value)),
      map((userData) => {
        if (userData) return null;
        return { userDoesNotExist: true };
      }),
      catchError(() => of(null))
    );
  }
}
