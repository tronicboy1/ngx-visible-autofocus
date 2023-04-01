import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoseAdministrationService } from '../dose-administration.service';

@Component({
  selector: 'app-add-forgotten-dose',
  templateUrl: './add-forgotten-dose.component.html',
  styleUrls: ['./add-forgotten-dose.component.css'],
})
export class AddForgottenDoseComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private doseAdministrationService = inject(DoseAdministrationService);

  return() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  addDose() {
    const { rxId, takenAt, date } = this.route.snapshot.queryParams;
    const { memberId } = this.route.snapshot.params;
    this.doseAdministrationService.create$(memberId, rxId, Number(takenAt), Number(date)).subscribe({
      next: () => this.doseAdministrationService.refresh(),
      complete: () => this.return(),
    });
  }
}
