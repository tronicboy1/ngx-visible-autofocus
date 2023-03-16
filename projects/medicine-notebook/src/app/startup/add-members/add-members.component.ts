import { Component, inject } from '@angular/core';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { map, startWith, Subject, switchMap } from 'rxjs';
import { FamilyService } from '../../family/family.service';
import { MemberService } from '../../family/member.service';

@Component({
  selector: 'startup-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.css'],
})
export class AddMembersComponent {
  private auth = inject(AuthService);
  private family = inject(FamilyService);
  private member = inject(MemberService);

  private refresh$ = new Subject<void>();

  readonly members$ = this.refresh$.pipe(
    startWith(undefined),
    switchMap(() => this.auth.getUid()),
    switchMap((uid) => this.family.getMembersFamily$(uid)),
    map((family) => {
      if (!family) throw ReferenceError('NoFamily');
      return family;
    }),
    switchMap((family) => this.member.getFamilyMembers$(family.id)),
  );
}
