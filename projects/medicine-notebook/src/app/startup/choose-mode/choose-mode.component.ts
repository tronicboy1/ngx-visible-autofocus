import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UseMode } from '../../group/group-factory';

@Component({
  selector: 'startup-choose-mode',
  templateUrl: './choose-mode.component.html',
  styleUrls: ['./choose-mode.component.css'],
})
export class ChooseModeComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  readonly UseMode = UseMode;

  handleDecision(decision: UseMode) {
    this.router.navigate(['..', 'group'], {
      relativeTo: this.route,
      queryParams: { useMode: decision },
    });
  }
}
