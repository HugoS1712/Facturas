import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']   // ✅ 🔥 ESTA LÍNEA ES LA CLAVE
})
export class Login {

  usuario = '';
  password = '';

  usuarios = [
    { usuario: 'admin', password: '1234' },
    { usuario: 'hugo', password: '1234' },
    { usuario: 'soporte', password: '1234' }
  ];

  constructor(private router: Router) { }

  login() {
    const user = this.usuarios.find(u =>
      u.usuario === this.usuario && u.password === this.password
    );

    if (user) {
      localStorage.setItem('usuarioLogueado', user.usuario);

      // ✅ recarga completa (correcto)
      window.location.href = '/';

    } else {
      alert('❌ Usuario o contraseña incorrectos');
    }
  }
}