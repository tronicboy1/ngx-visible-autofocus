import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartupRoutingModule } from './startup-routing.module';
import { StartupComponent } from './startup.component';
import { CreateMemberFormComponent } from './create-member-form/create-member-form.component';
import { AddMembersComponent } from './add-members/add-members.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxBaseComponentsModule } from 'projects/tronicboy/ngx-base-components/src/public-api';
import { AddMemberDetailsFormComponent } from './add-member-details-form/add-member-details-form.component';
import { AddMemberModalComponent } from './add-member-modal/add-member-modal.component';
import { NgxVisibleAutofocusModule } from 'projects/ngx-visible-autofocus/src/public-api';
import { AddMemberDetailsModalComponent } from './add-member-details-modal/add-member-details-modal.component';
import { ChooseModeComponent } from './choose-mode/choose-mode.component';
import { SingleUserRegisterComponent } from './single-user-register/single-user-register.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { CreateGroupFormComponent } from './create-group-form/create-group-form.component';

@NgModule({
  declarations: [
    StartupComponent,
    CreateGroupFormComponent,
    CreateMemberFormComponent,
    CreateGroupComponent,
    AddMembersComponent,
    AddMemberDetailsFormComponent,
    AddMemberModalComponent,
    AddMemberDetailsModalComponent,
    ChooseModeComponent,
    SingleUserRegisterComponent,
  ],
  imports: [
    CommonModule,
    StartupRoutingModule,
    ReactiveFormsModule,
    NgxBaseComponentsModule,
    NgxVisibleAutofocusModule,
  ],
})
export class StartupModule {}
