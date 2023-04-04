import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members.component';
import { MemberListComponent } from './member-list/member-list.component';
import { EditMemberFormComponent } from './edit-member-form/edit-member-form.component';
import { EditMemberModalComponent } from './edit-member-modal/edit-member-modal.component';
import { DeleteMemberCheckComponent } from './delete-member-check/delete-member-check.component';
import { CreateMemberFormComponent } from './create-member-form/create-member-form.component';
import { AddMemberModalComponent } from './add-member-modal/add-member-modal.component';
import { SharedModule } from '../shared/shared.module';
import { GroupModule } from '../group/group.module';

@NgModule({
  declarations: [
    MembersComponent,
    MemberListComponent,
    EditMemberFormComponent,
    EditMemberModalComponent,
    DeleteMemberCheckComponent,
    CreateMemberFormComponent,
    AddMemberModalComponent,
  ],
  imports: [CommonModule, MembersRoutingModule, SharedModule, GroupModule],
  exports: [CreateMemberFormComponent],
})
export class MembersModule {}
