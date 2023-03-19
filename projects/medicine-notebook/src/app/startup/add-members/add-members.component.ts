import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { filter, first, map, shareReplay, startWith, switchMap } from 'rxjs';
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

  private refresh$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd && !event.url.includes('add')),
  );

  private group$ = this.auth.getUid().pipe(
    switchMap((uid) => this.group.getGroupByUid$(uid)),
    map((group) => {
      if (!group) throw ReferenceError('NoGroup');
      return group;
    }),
  );
  readonly members$ = this.refresh$.pipe(
    startWith(undefined),
    switchMap(() => this.group$),
    switchMap((group) => this.member.getGroupMembers$(group.id)),
    shareReplay(1),
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

  handleCompletion() {
    this.members$
      .pipe(
        first(),
        switchMap((members) => {
          if (!members.length) throw ReferenceError('NoMembersError');
          return this.group.update$(members[0].groupId, { setupCompleted: true });
        }),
      )
      .subscribe({
        next: () => this.router.navigate(['/home']),
      });
  }
}
