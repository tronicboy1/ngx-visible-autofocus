import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-password-reset-modal',
  templateUrl: './password-reset-modal.component.html',
  styleUrls: ['./password-reset-modal.component.css'],
})
export class PasswordResetModalComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  close() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
