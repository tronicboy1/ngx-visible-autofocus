import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { NewRxEditStateService } from './new-rx-edit-state.service';

export const canLeaveRxFormGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  const newRxEditStateService = inject(NewRxEditStateService);

  const isEditing = newRxEditStateService.get(component as Object);
  if (isEditing) {
    return window.confirm($localize`書き掛けの情報は消えます。本当によろしいでしょうか？`);
  }
  return true;
};
