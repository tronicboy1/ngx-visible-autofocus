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

@NgModule({
  declarations: [
    StartupComponent,
    CreateFamilyFormComponent,
    CreateMemberFormComponent,
    CreateFamilyComponent,
    AddMembersComponent,
    AddMemberDetailsFormComponent,
    AddMemberModalComponent,
  ],
  imports: [CommonModule, StartupRoutingModule, ReactiveFormsModule, NgxBaseComponentsModule],
})
export class StartupModule {}
