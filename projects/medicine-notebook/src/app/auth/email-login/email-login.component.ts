import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { from } from 'rxjs';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.css'],
})
export class EmailLoginComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const { email } = this.route.snapshot.queryParams;
    if (!email) throw ReferenceError('InvalidUrl');
    from(this.auth.finishSignInWithEmail(email)).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => this.router.navigate(['/auth']),
    });
  }
}
