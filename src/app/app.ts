import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
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

  constructor(private router: Router) {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.verificarLogin();
      });

  }

  ngOnInit() {
    this.verificarLogin();
  }

  verificarLogin() {

    if (typeof window === 'undefined') {
      return;
    }

    const user = localStorage.getItem('usuarioLogueado');

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
      'usuario'
    );

  }

  logout() {

    if (typeof window === 'undefined') {
      return;
    }

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

    // ✅ vuelve a la pantalla de bienvenida
    this.router.navigate(['/']);

  }

}