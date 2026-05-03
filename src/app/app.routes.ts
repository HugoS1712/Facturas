import { Routes } from '@angular/router';
import { Lista } from './componentes/lista/lista';
import { Error } from './componentes/error/error';
import { NotFound } from './componentes/not-found/not-found';
import { Principal } from './componentes/principal/principal';

export const routes: Routes = [
    { path: 'lista', component: Lista },
    { path: 'error', component: Error },
    { path: '', component: Principal },
    { path: '**', component: NotFound }

];
