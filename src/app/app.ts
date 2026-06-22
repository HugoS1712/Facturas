import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink], // 🔥 SACAMOS RouterLinkActive
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {

  protected readonly title = signal('facturacion');

  logueado = false;
  usuario = ''; // ✅ ESTA ES LA FIX CLAVE

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
    const user = localStorage.getItem('usuarioLogueado');

    this.logueado = !!user;
    this.usuario = user || ''; // ✅ cargar usuario
  }

  logout() {
    localStorage.removeItem('usuarioLogueado');
    this.logueado = false;
    this.usuario = ''; // ✅ limpiar
    this.router.navigate(['/login']);
  }
}