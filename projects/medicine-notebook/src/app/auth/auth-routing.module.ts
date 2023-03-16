import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { FinishSignupComponent } from './finish-signup/finish-signup.component';
import { hasFamilyIdGuard } from './has-family-id.guard';
import { PasswordResetModalComponent } from './password-reset-modal/password-reset-modal.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [{ path: 'reset-password', component: PasswordResetModalComponent }],
  },
  {
    path: 'finish-signup',
    canActivate: [hasFamilyIdGuard],
    component: FinishSignupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
