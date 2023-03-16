import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { first, mergeMap } from 'rxjs';
import { FamilyService } from '../../family/family.service';

@Component({
  selector: 'startup-single-user-register',
  templateUrl: './single-user-register.component.html',
  styleUrls: ['./single-user-register.component.css'],
})
export class SingleUserRegisterComponent {
  private auth = inject(AuthService);
  private family = inject(FamilyService);
  private router = inject(Router);

  handleSubmission() {
    this.auth
      .getUid()
      .pipe(
        first(),
        mergeMap((uid) => this.family.getMembersFamily$(uid)),
        mergeMap((family) => {
          if (!family) throw ReferenceError('NoFamilyError');
          return this.family.update$(family.id, { setupCompleted: true });
        }),
      )
      .subscribe({
        next: () => this.router.navigate(['/home']),
      });
  }
}
