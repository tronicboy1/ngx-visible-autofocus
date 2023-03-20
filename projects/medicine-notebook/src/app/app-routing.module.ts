import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'projects/ngx-firebase-user-platform/src/public-api';
import { setupFinishedGuard } from './startup/guards/setup-finished.guard';
import { setupNotFinishedGuard } from './startup/guards/setup-not-finished.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  {
    path: 'startup',
    canActivate: [authGuard, setupFinishedGuard],
    loadChildren: () => import('./startup/startup.module').then((m) => m.StartupModule),
  },
  {
    path: 'home',
    canActivate: [authGuard, setupNotFinishedGuard],
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
