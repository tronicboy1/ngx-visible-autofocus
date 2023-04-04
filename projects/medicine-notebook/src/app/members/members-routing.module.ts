import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersComponent } from './members.component';
import { AddMemberModalComponent } from './add-member-modal/add-member-modal.component';
import { DeleteMemberCheckComponent } from './delete-member-check/delete-member-check.component';
import { EditMemberModalComponent } from './edit-member-modal/edit-member-modal.component';
import { canCloseAddMemberModalGuard } from './can-close-add-member-modal.guard';

const routes: Routes = [
  {
    path: '',
    component: MembersComponent,
    children: [
      { path: 'add', component: AddMemberModalComponent, canDeactivate: [canCloseAddMemberModalGuard] },
      { path: ':memberId/delete', component: DeleteMemberCheckComponent },
      { path: ':memberId/edit', component: EditMemberModalComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembersRoutingModule {}
