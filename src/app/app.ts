import { Component, signal, OnInit } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  Router,
  NavigationEnd
} from '@angular/router';

import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {

  protected readonly title = signal('facturacion');

  logueado = false;

  usuario = '';

  nombreUsuario = signal('');
  fotoUsuario = signal('');
  rol = signal('');

  modoOscuro = false;

  menu = [
    { texto: 'Inicio', ruta: '' },
    { texto: 'Dashboard 📊', ruta: '/dashboard' },
    { texto: 'Mi Perfil 👤', ruta: '/perfil' },
    { texto: 'Crear Ticket', ruta: '/ticket' },
    { texto: 'Lista Tickets', ruta: '/tickets' },
    { texto: 'Factura', ruta: '/factura' },
    { texto: 'Lista Facturas', ruta: '/lista' },
    { texto: 'Foro', ruta: '/foro' }
  ];

  constructor(private router: Router) {

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {

        this.verificarLogin();

      });

  }

  ngOnInit() {

    this.modoOscuro =
      localStorage.getItem('modoOscuro') === 'true';

    this.verificarLogin();

  }

  toggleTema() {

    this.modoOscuro =
      !this.modoOscuro;

    localStorage.setItem(
      'modoOscuro',
      String(this.modoOscuro)
    );

  }

  verificarLogin() {

    if (typeof window === 'undefined') {
      return;
    }

    const user =
      localStorage.getItem('usuario');

    this.logueado = !!user;

    this.usuario = user || '';

    this.nombreUsuario.set(
      localStorage.getItem('nombreUsuario') ||
      this.usuario
    );

    this.fotoUsuario.set(
      localStorage.getItem('fotoUsuario') ||
      ''
    );

    this.rol.set(
      localStorage.getItem('rol') ||
      'Usuario'
    );

  }

  logout() {

    if (typeof window === 'undefined') {
      return;
    }

    localStorage.removeItem('usuario');
    localStorage.removeItem('usuarioLogueado');
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('fotoUsuario');
    localStorage.removeItem('uidUsuario');
    localStorage.removeItem('logueado');
    localStorage.removeItem('rol');

    this.logueado = false;
    this.usuario = '';

    this.nombreUsuario.set('');
    this.fotoUsuario.set('');
    this.rol.set('');

    this.router.navigate(['/']);

  }

}