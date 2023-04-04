import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { MemberService } from '../../group/member.service';

@Component({
  selector: 'startup-edit-member-modal',
  templateUrl: './edit-member-modal.component.html',
  styleUrls: ['./edit-member-modal.component.css'],
})
export class EditMemberModalComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private member = inject(MemberService);

  readonly memberId$ = this.route.params.pipe(map((params) => params['memberId']));
  readonly modalTitle$ = this.memberId$.pipe(
    switchMap((memberId) => this.member.get$(memberId)),
    map((member) => $localize`${member.name}さんの情報を編集する`),
  );

  close() {
    this.router.navigate([''], { relativeTo: this.route.parent });
  }
}
