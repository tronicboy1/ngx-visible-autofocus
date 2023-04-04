import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartupRoutingModule } from './startup-routing.module';
import { StartupComponent } from './startup.component';
import { AddMembersComponent } from './add-members/add-members.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxBaseComponentsModule } from 'projects/tronicboy/ngx-base-components/src/public-api';
import { NgxVisibleAutofocusModule } from 'projects/ngx-visible-autofocus/src/public-api';
import { ChooseModeComponent } from './choose-mode/choose-mode.component';
import { SingleUserRegisterComponent } from './single-user-register/single-user-register.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { CreateGroupFormComponent } from './create-group-form/create-group-form.component';
import { GroupModule } from '../group/group.module';
import { SharedModule } from '../shared/shared.module';
import { MembersModule } from '../members/members.module';

@NgModule({
  declarations: [
    StartupComponent,
    CreateGroupFormComponent,
    CreateGroupComponent,
    AddMembersComponent,
    ChooseModeComponent,
    SingleUserRegisterComponent,
  ],
  imports: [
    CommonModule,
    StartupRoutingModule,
    ReactiveFormsModule,
    NgxBaseComponentsModule,
    NgxVisibleAutofocusModule,
    GroupModule,
    SharedModule,
    MembersModule,
  ],
})
export class StartupModule {}
