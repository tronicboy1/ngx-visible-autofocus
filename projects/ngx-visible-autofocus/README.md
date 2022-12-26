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
