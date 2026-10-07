import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { routes } from './app.routes';

registerLocaleData(localeEs);

const firebaseConfig = {
  apiKey: "AIzaSyA_I2nYL8qe4OTOzqaw2mQH16n0La6aK9M",
  authDomain: "beltran-2eddb.firebaseapp.com",
  projectId: "beltran-2eddb",
  storageBucket: "beltran-2eddb.firebasestorage.app",
  messagingSenderId: "483064218679",
  appId: "1:483064218679:web:687f0feb4e3cb11e2cabb2",
  measurementId: "G-7EDE0Y9MC6"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),

    provideFirebaseApp(() =>
      initializeApp(firebaseConfig)
    ),

    provideAuth(() => getAuth()),

    {
      provide: LOCALE_ID,
      useValue: 'es-AR'
    }
  ]
};