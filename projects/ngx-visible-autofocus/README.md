# About this Package

This is a module for Angular to autofocus an element when it is visible in the DOM.

## How this Package Differs from normal autofocus

This package uses an Intersection Observer to detect if an element is visible before focussing it.

This directive will always autofocus an element when it comes into view, making is useful for hidden inputs that come into view after the page is loaded.

The directive also ensures that only one IntersectionObserver instance is created for all components with this directive, preventing extra usage of resources.

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

### Use as directive on Component

```html
<input type="text" ngxAutofocus />
```

#### Providing a custom callback

You can optionally customize the callback.

```html
<input type="text" ngxAutofocus [customCallback]="() => this.focus()" />
```

#### Callback firing setting

You can optionally change the callback setting from only firing once when the element comes into view.

```html
<input type="text" ngxAutofocus [once]="false" />
```
