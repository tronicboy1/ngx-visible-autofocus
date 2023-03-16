import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { MemberService } from '../../group/member.service';

@Component({
  selector: 'startup-add-member-details-modal',
  templateUrl: './add-member-details-modal.component.html',
  styleUrls: ['./add-member-details-modal.component.css']
})
export class AddMemberDetailsModalComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private member = inject(MemberService);

  readonly modalTitle$ = this.route.params.pipe(
    map((params) => params['memberId'] as string),
    switchMap((id) => this.member.get$(id)),
    map((member) =>  $localize`${member.name}さんの詳細情報を追加する`),
  );

  close() {
    this.router.navigate([''], { relativeTo: this.route.parent });
  }
}
