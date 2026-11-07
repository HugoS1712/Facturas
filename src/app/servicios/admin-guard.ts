import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {

  const router = inject(Router);

  const logueado = localStorage.getItem('logueado');
  const rol = localStorage.getItem('rol');

  if (
    logueado === 'true' &&
    (
      rol === 'Admin' ||
      rol === 'Administrador'
    )
  ) {
    return true;
  }

  return router.parseUrl('/error');

};