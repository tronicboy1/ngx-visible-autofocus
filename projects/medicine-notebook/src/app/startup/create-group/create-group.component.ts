import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { UseMode } from '../../group/group-factory';

@Component({
  selector: 'startup-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css'],
})
export class CreateGroupComponent {
  private route = inject(ActivatedRoute);

  readonly useMode$ = this.route.queryParams.pipe(map((params) => Number(params['useMode'])));
  readonly headerText$ = this.useMode$.pipe(
    map((useMode) => (useMode === UseMode.Group ? $localize`グループ作成` : $localize`苗字`)),
  );
}
