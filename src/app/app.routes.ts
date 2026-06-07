

import { Routes } from '@angular/router';

import { Lista } from './componentes/lista/lista';
import { ErrorComponent } from './componentes/error/error';
import { NotFound } from './componentes/not-found/not-found';
import { Principal } from './componentes/principal/principal';
import { FacturaComponent } from './componentes/factura/factura';
import { Ticket } from './componentes/ticket/ticket';
import { TicketList } from './componentes/ticket-list/ticket-list';
import { Login } from './componentes/login/login';
import { authGuard } from './servicios/auth-guard';

export const routes: Routes = [
    { path: '', component: Principal },

    { path: 'login', component: Login },

    { path: 'lista', component: Lista },
    { path: 'factura', component: FacturaComponent },

    // ✅ RUTAS PROTEGIDAS
    { path: 'ticket', component: Ticket, canActivate: [authGuard] },
    { path: 'tickets', component: TicketList, canActivate: [authGuard] },

    { path: 'error', component: ErrorComponent },

    { path: '**', component: NotFound }
];
``