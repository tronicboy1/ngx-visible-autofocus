import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { first, switchMap } from 'rxjs';
import { FamilyService } from '../../family/family.service';
import { MemberService } from '../../family/member.service';

@Component({
  selector: 'auth-finish-signup',
  templateUrl: './finish-signup.component.html',
  styleUrls: ['./finish-signup.component.css'],
})
export class FinishSignupComponent implements OnInit {
  private auth = inject(AuthService);
  private family = inject(FamilyService);
  private member = inject(MemberService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        first(),
        switchMap((params) => this.auth.finishSignInWithEmail(params['email'])),
      )
      .subscribe(console.log);
  }
}
