import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { first, mergeMap } from 'rxjs';
import { UseMode } from '../../group/group-factory';
import { GroupService } from '../../group/group.service';

@Component({
  selector: 'startup-choose-mode',
  templateUrl: './choose-mode.component.html',
  styleUrls: ['./choose-mode.component.css'],
})
export class ChooseModeComponent {
  private auth = inject(AuthService);
  private group = inject(GroupService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  readonly UseMode = UseMode;

  handleDecision(decision: UseMode) {
    this.auth
      .getUid()
      .pipe(
        first(),
        mergeMap((uid) => this.group.getMembersGroup$(uid)),
        mergeMap((group) => {
          if (!group) throw ReferenceError('NoGroupError');
          return this.group.update$(group.id, { useMode: decision });
        }),
      )
      .subscribe({
        next: () =>
          this.router.navigate([decision === UseMode.SingleUser ? 'single-user' : 'members'], {
            relativeTo: this.route,
          }),
      });
  }
}
