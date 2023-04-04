import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map, switchMap } from 'rxjs';
import { MembersInheritable } from '../../members/members.inheritable';

@Component({
  selector: 'startup-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.css'],
})
export class AddMembersComponent extends MembersInheritable implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

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
