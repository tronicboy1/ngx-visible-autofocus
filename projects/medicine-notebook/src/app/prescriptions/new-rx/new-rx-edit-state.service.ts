import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NewRxEditStateService {
  private editStateMap = new WeakMap<Object, boolean>();

  set(component: Object, state: boolean): void {
    this.editStateMap.set(component, state);
  }

  get(component: Object): boolean {
    return this.editStateMap.get(component) ?? false;
  }
}
