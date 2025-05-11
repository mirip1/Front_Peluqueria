import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AuthInterceptor } from './app/auth/auth.interceptor';
import { AuthService } from './app/auth/services/auth.service';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
.then(appRef => {
  const auth = appRef.injector.get(AuthService);
  auth.init();
})
.catch(err => console.error(err));
