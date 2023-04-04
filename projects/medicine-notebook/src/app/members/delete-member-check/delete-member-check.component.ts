import { Component, inject } from '@angular/core';
import { first, map, mergeMap } from 'rxjs';
import { MemberService } from '../../group/member.service';
import { RelativeRoutingInheritable } from '../relative-routing.inheritable';

@Component({
  selector: 'startup-delete-member-check',
  templateUrl: './delete-member-check.component.html',
  styleUrls: ['./delete-member-check.component.css'],
})
export class DeleteMemberCheckComponent extends RelativeRoutingInheritable {
  private member = inject(MemberService);

  deleteMember() {
    this.route.params
      .pipe(
        first(),
        map((params) => params['memberId'] as string),
        mergeMap((memberId) => this.member.delete$(memberId)),
      )
      .subscribe({
        next: () => {
          this.member.refresh();
          this.close();
        },
        error: () => this.close(),
      });
  }
}
