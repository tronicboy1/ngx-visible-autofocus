import { Directive, EventEmitter, inject, Output } from '@angular/core';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { filter } from 'rxjs';

@Directive()
export class InheritableAccountDetailsComponent {
  protected authService = inject(AuthService);
  public loading = false;
  public user$ = this.authService.getAuthState().pipe(filter(Boolean));
  @Output() submitted = new EventEmitter<null>();

  static getFormData = (event: Event) => {
    event.preventDefault();
    const target = event.currentTarget;
    if (!(target instanceof HTMLFormElement)) throw TypeError('Must be used with HTMLFormElement.');
    return { formData: new FormData(target), form: target };
  };
}
