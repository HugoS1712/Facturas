import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);

  console.log('🔥 GUARD ejecutándose');

  // ✅ chequeo si estoy en navegador
  if (typeof window !== 'undefined') {

    const logueado = localStorage.getItem('logueado');

    if (logueado === 'true') {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }

  }

  // ✅ si es SSR, dejar pasar
  return true;
};