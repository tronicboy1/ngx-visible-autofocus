import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'ngx-firebase-user-platform';
import { map } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  readonly isAuth$ = this.authService.getAuthState().pipe(map(Boolean));

  public handleLogoutClick = () => {
    this.authService.signOutUser().then(() => this.router.navigateByUrl('/auth'));
  };
}
