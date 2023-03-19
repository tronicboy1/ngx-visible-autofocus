import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgxBaseComponentsModule } from 'projects/tronicboy/ngx-base-components/src/public-api';
import { NgxFirebaseUserNavbarModule } from 'projects/tronicboy/ngx-firebase-user-navbar/src/public-api';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, NgxBaseComponentsModule, NgxFirebaseUserNavbarModule, SharedModule],
})
export class HomeModule {}
