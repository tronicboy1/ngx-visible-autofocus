import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'ngx-firebase-user-platform';
import { InheritableAccountDetailsComponent } from '../inheritable-account-details-component';

@Component({
  selector: 'app-change-email-form',
  templateUrl: './change-email-form.component.html',
  styleUrls: ['./change-email-form.component.css'],
})
export class ChangeEmailFormComponent implements OnInit {
  public loading = false;
  @Output()
  public submitted = new EventEmitter<null>();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  public handleSubmit: EventListener = (event) => {
    const { formData } = InheritableAccountDetailsComponent.getFormData(event);
    const newEmail = formData.get('new-email')!.toString().trim();
    this.loading = true;
    this.authService
      .changeEmail(newEmail)
      .then(() => this.submitted.emit(null))
      .catch(console.error)
      .finally(() => (this.loading = false));
  };
}
