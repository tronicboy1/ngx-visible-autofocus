import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartupRoutingModule } from './startup-routing.module';
import { StartupComponent } from './startup.component';
import { CreateFamilyFormComponent } from './create-family-form/create-family-form.component';
import { CreateMemberFormComponent } from './create-member-form/create-member-form.component';
import { CreateFamilyComponent } from './create-family/create-family.component';
import { AddMembersComponent } from './add-members/add-members.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxBaseComponentsModule } from 'projects/tronicboy/ngx-base-components/src/public-api';
import { AddMemberDetailsFormComponent } from './add-member-details-form/add-member-details-form.component';
import { AddMemberModalComponent } from './add-member-modal/add-member-modal.component';
import { NgxVisibleAutofocusModule } from 'projects/ngx-visible-autofocus/src/public-api';
import { AddMemberDetailsModalComponent } from './add-member-details-modal/add-member-details-modal.component';

@NgModule({
  declarations: [
    StartupComponent,
    CreateFamilyFormComponent,
    CreateMemberFormComponent,
    CreateFamilyComponent,
    AddMembersComponent,
    AddMemberDetailsFormComponent,
    AddMemberModalComponent,
    AddMemberDetailsModalComponent,
  ],
  imports: [CommonModule, StartupRoutingModule, ReactiveFormsModule, NgxBaseComponentsModule, NgxVisibleAutofocusModule],
})
export class StartupModule {}
