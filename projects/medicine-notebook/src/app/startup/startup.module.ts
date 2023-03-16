import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartupRoutingModule } from './startup-routing.module';
import { StartupComponent } from './startup.component';
import { CreateFamilyFormComponent } from './create-family-form/create-family-form.component';
import { CreateMemberFormComponent } from './create-member-form/create-member-form.component';
import { CreateFamilyComponent } from './create-family/create-family.component';
import { AddMembersComponent } from './add-members/add-members.component';

@NgModule({
  declarations: [StartupComponent, CreateFamilyFormComponent, CreateMemberFormComponent, CreateFamilyComponent, AddMembersComponent],
  imports: [CommonModule, StartupRoutingModule],
})
export class StartupModule {}
