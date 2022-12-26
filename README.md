# About this Package

This is a module for Angular to autofocus an element when it is visible in the DOM.

# How to use this package

### Install the package with ng add.

```
ng add ngx-visible-autofocus
```

OR

```
npm i ngx-visible-autofocus
ng add ngx-visible-autofocus
```

### Add the package to desired module imports

Commonly add to `app.module.ts`

```typescript
import { NgxVisibleAutofocusModule } from 'ngx-visible-autofocus';


@NgModule({
  declarations: [AppComponent],
  imports: [..., NgxVisibleAutofocusModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
