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

import { authGuard } from './servicios/auth-guard';

export const routes: Routes = [

  // ✅ BIENVENIDA PÚBLICA
  {
    path: '',
    component: Principal
  },

  // ✅ LOGIN
  {
    path: 'login',
    component: Login
  },

  // ✅ INICIO DEL SISTEMA
  {
    path: 'inicio',
    component: Principal,
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
    canActivate: [authGuard]
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