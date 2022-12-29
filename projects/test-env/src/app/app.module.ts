import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxObservableDirectiveModule } from 'projects/ngx-observable-directive/src/public-api';

import { AppComponent } from './app.component';
import { ChildComponent } from './child/child.component';

@NgModule({
  declarations: [AppComponent, ChildComponent],
  imports: [
    BrowserModule,
    NgxObservableDirectiveModule.forRoot({ rootMargin: '50px' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
