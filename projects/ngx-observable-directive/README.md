# NgxObservableDirective

This is a library that exports a directive `ngxObservable` which emits events when the element it is attached to comes into view in the DOM.

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.0.

### Why this library is different?

This library ensures that no matter how many elements you observe, there is only one IntersectionObserver instance assigned to watching them and handling their callbacks.

This is paramount when dealing with hundreds of possible elements, where having a single IntersectionObserver per element would result in poor performance.

## Usage

### Importing the module

First, the module exposed in the library must be imported.

There are two patterns for importing this library. The first is simply adding it to the imports:

#### Default settings

`app.module.ts`

```typescript
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgxObservableDirectiveModule } from "ngx-observable-directive";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent, ChildComponent],
  imports: [BrowserModule, NgxObservableDirectiveModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

#### Custom Observer Settings

Next, is the case where you would like to provide your own settings for the IntersectionObserver instance:

```typescript
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgxObservableDirectiveModule } from "ngx-observable-directive";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent, ChildComponent],
  imports: [
    BrowserModule,
    NgxObservableDirectiveModule.forRoot({ rootMargin: "50px" }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### Observing an Element

After importing the module, simply add the directive to an element and provide a callback when it comes into view.

```html
<div ngxObservable (intersection)="handleInView()"></div>
```

#### Only firing once

You can also only have this observable only fire once.

```html
<div ngxObservable (intersection)="handleInView()" [once]=""></div>
```

#### Custom callback

You may also supply your own callback if you would like to avoid the EventEmitter pattern.

```html
<div ngxObservable [customCallback]="handleInView"></div>
```

## Code scaffolding

Run `ng generate component component-name --project ngx-observable-directive` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ngx-observable-directive`.

> Note: Don't forget to add `--project ngx-observable-directive` or else it will be added to the default project in your `angular.json` file.

## Build

Run `ng build ngx-observable-directive` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ngx-observable-directive`, go to the dist folder `cd dist/ngx-observable-directive` and run `npm publish`.

## Running unit tests

Run `ng test ngx-observable-directive` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
