import { Routes } from '@angular/router';
import { Lista } from './componentes/lista/lista';
import { ErrorComponent } from './componentes/error/error';
import { NotFound } from './componentes/not-found/not-found';
import { Principal } from './componentes/principal/principal';
import { FacturaComponent } from './componentes/factura/factura';
import { Ticket } from './componentes/ticket/ticket';

export const routes: Routes = [
    { path: 'lista', component: Lista },
    { path: 'error', component: ErrorComponent },
    { path: '', component: Principal },
    { path: 'factura', component: FacturaComponent },
    { path: 'ticket', component: Ticket },
    { path: '**', component: NotFound }

];
