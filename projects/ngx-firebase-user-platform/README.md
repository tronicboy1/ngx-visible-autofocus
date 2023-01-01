# NgxFirebaseUserPlatform

This is a Angular library for using Firebase with Angular. It provides a basic platform for logging in users and handling basic user data.

Consuming this library requires that you have a Firebase project with Firebase Auth, Firebase Storage and Firestore setup.

## How to use

### Importing the module in AppModule

Provide the NgxFirebaseUserPlatformModule in ypuo AppModule using the NgxFirebaseUserPlatformModule.forRoot function.

You must provide your firebase app config and environment settings to the Module.

```typescript
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { NgxFirebaseUserPlatformModule } from "ngx-firebase-user-platform";
import { environment } from "src/environments/environment";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxFirebaseUserPlatformModule.forRoot({
      firebaseConfig: {
        apiKey: "...",
        authDomain: "...",
        projectId: "...",
        storageBucket: "...",
        messagingSenderId: "...",
        appId: "...",
        measurementId: "...",
      },
      production: environment.production,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### Importing in all other modules

Be sure to only use NgxFirebaseUserPlatformModule.forRoot in AppModule. All sub modules can use this library by simply adding it to their imports.

```typescript
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxFirebaseUserPlatformModule } from "ngx-firebase-user-platform";

@NgModule({
  declarations: [],
  imports: [CommonModule, NgxFirebaseUserPlatformModule],
})
export class LogModule {}
```

#### Using App Check or Analytics

You may also configure app check by providing App check config as a third parameter.

```typescript
...
import { ReCaptchaV3Provider } from 'firebase/app-check';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxFirebaseUserPlatformModule.forRoot({
      firebaseConfig: {
        apiKey: "...",
        authDomain: "...",
        projectId: "...",
        storageBucket: "...",
        messagingSenderId: "...",
        appId: "...",
        measurementId: "...",
      },
      production: environment.production,
      appCheck: {
        provider: new ReCaptchaV3Provider(
          "6Lffd0wjAAAAAN7ghKd7xyOOyqcmthVEOecCx_g5"
        ),
        isTokenAutoRefreshEnabled: true,
      },
      analytics: true,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

#### Using Firebase Emulator Suite

If you are using Firebase Emulator suite, you can enable its usage in this library as well by providing port configurations.

```typescript
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxFirebaseUserPlatformModule.forRoot({
      firebaseConfig: {
        apiKey: "...",
        authDomain: "...",
        projectId: "...",
        storageBucket: "...",
        messagingSenderId: "...",
        appId: "...",
        measurementId: "...",
      },
      production: environment.production,
      emulators: {
        auth: 9099,
        firestore: 8080,
        storage: 9199,
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### Logging in Users

Use the AuthComponent provided in this library to login or register users. Please enable the login by email method in your Firebase project.

You can also use your own Login form with this library.

```typescript
import { AuthService } from 'ngx-firebase-user-platform';


  constructor(private authService: AuthService) {}

...

  handleSubmit() {
    this.mode === 'LOGIN'
        ? this.authService.signInUser(email, password)
        : this.authService.createUser(email, password);
  }
```

## Code scaffolding

Run `ng generate component component-name --project ngx-firebase-user-platform` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ngx-firebase-user-platform`.

> Note: Don't forget to add `--project ngx-firebase-user-platform` or else it will be added to the default project in your `angular.json` file.

## Build

Run `ng build ngx-firebase-user-platform` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ngx-firebase-user-platform`, go to the dist folder `cd dist/ngx-firebase-user-platform` and run `npm publish`.

## Running unit tests

Run `ng test ngx-firebase-user-platform` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
