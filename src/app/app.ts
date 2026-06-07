import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {

  protected readonly title = signal('facturacion');

  logueado = false;

  constructor(private router: Router) {

    // ✅ Esto detecta cada cambio de ruta
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.verificarLogin();
      });
  }

  ngOnInit() {
    this.verificarLogin();
  }

  // ✅ Verifica si el usuario está logueado
  verificarLogin() {
    this.logueado = localStorage.getItem('logueado') === 'true';
  }

  // ✅ Logout limpio
  logout() {
    localStorage.removeItem('logueado');
    this.logueado = false;
    this.router.navigate(['/login']);
  }
}
``