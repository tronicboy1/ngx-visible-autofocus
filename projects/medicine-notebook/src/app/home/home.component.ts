import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'projects/ngx-firebase-user-platform/src/public-api';
import { map, Subject, switchMap, takeUntil } from 'rxjs';
import { GroupService } from '../group/group.service';
import { MemberService } from '../group/member.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(AuthService);
  private group = inject(GroupService);
  private member = inject(MemberService);
  private teardown$ = new Subject<void>();

  readonly memberId$ = this.route.params.pipe(map((params) => params['memberId'] as string));
  readonly members$ = this.auth.getUid().pipe(
    switchMap((uid) => this.group.getGroupByUid$(uid)),
    switchMap((group) => {
      if (!group) throw ReferenceError('NoGroupForUser');
      return this.member.getGroupMembers$(group.id);
    }),
  );
  readonly memberSelectControl = new FormControl<string>('');

  ngOnInit() {
    this.memberId$
      .pipe(takeUntil(this.teardown$))
      .subscribe((id) => this.memberSelectControl.setValue(id, { emitEvent: false }));
    this.memberSelectControl.valueChanges.pipe(takeUntil(this.teardown$)).subscribe((selection) => {
      this.router.navigate(['..', selection], { relativeTo: this.route });
    });
  }

  ngOnDestroy(): void {
    this.teardown$.next();
  }
}
