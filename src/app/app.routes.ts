import { Routes } from '@angular/router';

import { Lista } from './componentes/lista/lista';
import { ErrorComponent } from './componentes/error/error';
import { NotFound } from './componentes/not-found/not-found';
import { Principal } from './componentes/principal/principal';
import { FacturaComponent } from './componentes/factura/factura';
import { Ticket } from './componentes/ticket/ticket';
import { TicketList } from './componentes/ticket-list/ticket-list';
import { TicketDetalle } from './componentes/ticket-detalle/ticket-detalle';
import { Login } from './componentes/login/login';
import { Administracion } from './componentes/administracion/administracion';
import { Foro } from './componentes/foro/foro';
import { ActivarCuenta } from './activar-cuenta/activar-cuenta';
import { Dashboard } from './componentes/dashboard/dashboard';
import { Perfil } from './componentes/perfil/perfil';

import { authGuard } from './servicios/auth-guard';
import { adminGuard } from './servicios/admin-guard';

export const routes: Routes = [

  {
    path: '',
    component: Principal
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'activar/:token',
    component: ActivarCuenta
  },

  {
    path: 'inicio',
    component: Principal,
    canActivate: [authGuard]
  },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },

  {
    path: 'perfil',
    component: Perfil,
    canActivate: [authGuard]
  },

  {
    path: 'lista',
    component: Lista,
    canActivate: [authGuard]
  },

  {
    path: 'factura',
    component: FacturaComponent,
    canActivate: [authGuard]
  },

  {
    path: 'ticket',
    component: Ticket,
    canActivate: [authGuard]
  },

  {
    path: 'tickets',
    component: TicketList,
    canActivate: [authGuard]
  },

  {
    path: 'tickets/:numero',
    component: TicketDetalle,
    canActivate: [authGuard]
  },

  {
    path: 'administracion',
    component: Administracion,
    canActivate: [adminGuard]
  },

  {
    path: 'foro',
    component: Foro,
    canActivate: [authGuard]
  },

  {
    path: 'error',
    component: ErrorComponent
  },

  {
    path: '**',
    component: NotFound
  }

];