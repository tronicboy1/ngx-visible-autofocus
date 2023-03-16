import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'startup-add-member-modal',
  templateUrl: './add-member-modal.component.html',
  styleUrls: ['./add-member-modal.component.css']
})
export class AddMemberModalComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  close() {
    this.router.navigate(['../'])
  }
}
