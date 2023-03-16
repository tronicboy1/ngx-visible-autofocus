import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { from, switchMap } from 'rxjs';
import { MemberService } from '../../family/member.service';

@Component({
  selector: 'auth-finish-signup',
  templateUrl: './finish-signup.component.html',
  styleUrls: ['./finish-signup.component.css'],
})
export class FinishSignupComponent implements OnInit {
  private auth = inject(AuthService);
  private member = inject(MemberService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const { email, familyId, memberId } = this.route.snapshot.queryParams;
    if (email && familyId && memberId) throw ReferenceError('InvalidUrl');
    from(this.auth.finishSignInWithEmail(email))
      .pipe(switchMap((result) => this.member.addMemberAccount$(familyId, memberId, result.user.uid)))
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: () => this.router.navigate(['/auth']),
      });
  }
}
