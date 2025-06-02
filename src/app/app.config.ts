import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';


import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';
import { LocaleService } from './shared/services/locale.service';
import { logginInterceptor } from '@shared/interceptors/loggin.interceptor';
import { authInterceptor } from '@auth/interceptos/auth.interceptors';



registerLocaleData(localeEs, 'es');

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideHttpClient(
    withFetch(),
    withInterceptors(
      [
        // logginInterceptor,
        authInterceptor,
      ]
    )),
  {
    provide: LOCALE_ID,
    deps: [LocaleService],
    useFactory: (localeService: LocaleService) => localeService.getLocale
  }

  ]
};
