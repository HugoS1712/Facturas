import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);

  console.log('🔥 GUARD ejecutándose');

  if (typeof window !== 'undefined') {

    const logueado = localStorage.getItem('logueado');

    // ✅ Usuario autenticado
    if (logueado === 'true') {
      return true;
    }

    // ❌ Usuario NO autenticado → REDIRECCIÓN CORRECTA
    return router.parseUrl('/login');
  }

  return true;
};