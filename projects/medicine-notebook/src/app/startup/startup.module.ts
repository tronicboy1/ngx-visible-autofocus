import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartupRoutingModule } from './startup-routing.module';
import { StartupComponent } from './startup.component';
import { CreateMemberFormComponent } from './create-member-form/create-member-form.component';
import { AddMembersComponent } from './add-members/add-members.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxBaseComponentsModule } from 'projects/tronicboy/ngx-base-components/src/public-api';
import { AddMemberModalComponent } from './add-member-modal/add-member-modal.component';
import { NgxVisibleAutofocusModule } from 'projects/ngx-visible-autofocus/src/public-api';
import { ChooseModeComponent } from './choose-mode/choose-mode.component';
import { SingleUserRegisterComponent } from './single-user-register/single-user-register.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { CreateGroupFormComponent } from './create-group-form/create-group-form.component';
import { EditMemberFormComponent } from './edit-member-form/edit-member-form.component';
import { GroupModule } from '../group/group.module';
import { DeleteMemberCheckComponent } from './delete-member-check/delete-member-check.component';
import { EditMemberModalComponent } from './edit-member-modal/edit-member-modal.component';

@NgModule({
  declarations: [
    StartupComponent,
    CreateGroupFormComponent,
    CreateMemberFormComponent,
    CreateGroupComponent,
    AddMembersComponent,
    AddMemberModalComponent,
    ChooseModeComponent,
    SingleUserRegisterComponent,
    EditMemberFormComponent,
    DeleteMemberCheckComponent,
    EditMemberModalComponent,
  ],
  imports: [
    CommonModule,
    StartupRoutingModule,
    ReactiveFormsModule,
    NgxBaseComponentsModule,
    NgxVisibleAutofocusModule,
    GroupModule,
  ],
})
export class StartupModule {}
