import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { filter, first, map, startWith, switchMap } from 'rxjs';
import { GroupService } from '../../group/group.service';
import { MemberService } from '../../group/member.service';

@Component({
  selector: 'startup-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.css'],
})
export class AddMembersComponent implements OnInit {
  private auth = inject(AuthService);
  private group = inject(GroupService);
  private member = inject(MemberService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private refresh$ = this.router.events.pipe(filter((event) => event instanceof NavigationEnd && !event.url.includes('add')));

  readonly members$ = this.refresh$.pipe(
    startWith(undefined),
    switchMap(() => this.auth.getUid()),
    switchMap((uid) => this.group.getMembersGroup$(uid)),
    map((group) => {
      if (!group) throw ReferenceError('NoGroup');
      return group;
    }),
    switchMap((group) => this.member.getGroupMembers$(group.id)),
  );

  ngOnInit() {
    this.members$
      .pipe(
        first(),
        map((members) => !members.length),
      )
      .subscribe((noMembers) => {
        if (noMembers) this.router.navigate(['add'], { relativeTo: this.route });
      });
  }
}
