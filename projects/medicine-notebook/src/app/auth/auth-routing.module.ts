import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { EmailLoginComponent } from './email-login/email-login.component';
import { EmailSentModalComponent } from './email-sent-modal/email-sent-modal.component';
import { FinishSignupComponent } from './finish-signup/finish-signup.component';
import { hasGroupIdGuard } from './has-group-id.guard';
import { PasswordResetModalComponent } from './password-reset-modal/password-reset-modal.component';
import { alreadyLoggedInGuard } from './already-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [alreadyLoggedInGuard],
    children: [
      { path: 'reset-password', component: PasswordResetModalComponent },
      { path: 'email-sent', component: EmailSentModalComponent },
    ],
  },
  {
    path: 'finish-signup',
    canActivate: [hasGroupIdGuard],
    component: FinishSignupComponent,
  },
  {
    path: 'email-login',
    component: EmailLoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
