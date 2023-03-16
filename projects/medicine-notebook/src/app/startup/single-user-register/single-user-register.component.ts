import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { first, mergeMap } from 'rxjs';
import { GroupService } from '../../group/group.service';

@Component({
  selector: 'startup-single-user-register',
  templateUrl: './single-user-register.component.html',
  styleUrls: ['./single-user-register.component.css'],
})
export class SingleUserRegisterComponent {
  private auth = inject(AuthService);
  private group = inject(GroupService);
  private router = inject(Router);

  handleSubmission() {
    this.auth
      .getUid()
      .pipe(
        first(),
        mergeMap((uid) => this.group.getMembersGroup$(uid)),
        mergeMap((group) => {
          if (!group) throw ReferenceError('NoGroupError');
          return this.group.update$(group.id, { setupCompleted: true });
        }),
      )
      .subscribe({
        next: () => this.router.navigate(['/home']),
      });
  }
}
