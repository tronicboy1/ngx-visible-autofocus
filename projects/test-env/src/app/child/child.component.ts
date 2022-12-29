import { Component, inject, OnInit } from '@angular/core';
import { ObserverService } from 'projects/ngx-observable-directive/src/lib/observer.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent implements OnInit {
  observerService = inject(ObserverService);
  constructor() {}

  ngOnInit(): void {}
}
