import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'projects/ngx-firebase-user-platform/src/public-api';
import { setupFinishedGuard } from './startup/setup-finished.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  {
    path: 'startup',
    canActivate: [authGuard],
    loadChildren: () => import('./startup/startup.module').then((m) => m.StartupModule),
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    canActivate: [setupFinishedGuard],
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
