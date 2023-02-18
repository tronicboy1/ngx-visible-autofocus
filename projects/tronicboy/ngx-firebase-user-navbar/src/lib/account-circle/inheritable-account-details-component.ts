import {
  Directive,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import type { User } from 'firebase/auth';
import { AuthService } from 'ngx-firebase-user-platform';
import type { Subscription } from 'rxjs';

@Directive()
export class InheritableAccountDetailsComponent implements OnInit, OnDestroy {
  protected authService = inject(AuthService);
  public loading = false;
  public user?: User;
  @Output() submitted = new EventEmitter<null>();

  protected subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.waitForUser().subscribe((user) => {
        this.user = user;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  static getFormData = (event: Event) => {
    event.preventDefault();
    const target = event.currentTarget;
    if (!(target instanceof HTMLFormElement))
      throw TypeError('Must be used with HTMLFormElement.');
    return { formData: new FormData(target), form: target };
  };
}
