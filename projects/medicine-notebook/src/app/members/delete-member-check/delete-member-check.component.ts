import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map, mergeMap } from 'rxjs';
import { MemberService } from '../../group/member.service';

@Component({
  selector: 'startup-delete-member-check',
  templateUrl: './delete-member-check.component.html',
  styleUrls: ['./delete-member-check.component.css'],
})
export class DeleteMemberCheckComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private member = inject(MemberService);

  returnToAddMembers() {
    this.router.navigate([''], { relativeTo: this.route.parent });
  }

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
          this.returnToAddMembers();
        },
        error: () => this.returnToAddMembers(),
      });
  }
}
