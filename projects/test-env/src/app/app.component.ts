import { Component, inject } from '@angular/core';
import { ObserverService } from 'projects/ngx-observable-directive/src/lib/observer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  observerService = inject(ObserverService);
  title = 'test-env';

  handleInView() {
    console.log('el in view');
  }
}
