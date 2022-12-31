import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';
import { NgxFirebaseUserPlatformModule } from './ngx-firebase-user-platform.module';

@Injectable({
  providedIn: NgxFirebaseUserPlatformModule,
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.getAuthState().pipe(
      take(1),
      map((user) => {
        const isAuth = Boolean(user);
        /** to be fixed : https://github.com/angular/angular/issues/16211 */
        if (!isAuth) this.router.navigateByUrl('/auth');
        return isAuth;
      })
    );
  }
}
