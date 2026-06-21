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

/* 👇 LA VAMOS A AGREGAR */
import { TicketDetalle } from './componentes/ticket-detalle/ticket-detalle';

export const routes: Routes = [

    { path: '', component: Principal, canActivate: [authGuard] },

    { path: 'login', component: Login },

    { path: 'lista', component: Lista },
    { path: 'factura', component: FacturaComponent },

    { path: 'ticket', component: Ticket, canActivate: [authGuard] },

    { path: 'tickets', component: TicketList, canActivate: [authGuard] },

    // 🔥 👉 ESTA ES LA NUEVA RUTA
    { path: 'tickets/:numero', component: TicketDetalle, canActivate: [authGuard] },

    { path: 'error', component: ErrorComponent },

    { path: '**', component: NotFound }
];
