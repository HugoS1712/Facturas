import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {

  usuario = '';
  password = '';

  constructor(private router: Router) { }

  login() {
    if (this.usuario === 'admin' && this.password === '1234') {

      // ✅ Guardar sesión
      localStorage.setItem('logueado', 'true');

      console.log('✅ LOGUEADO OK');

      // ✅ Navegación correcta (sin reload)
      this.router.navigate(['/']);

    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }

  resetPassword() {
    alert('Funcionalidad de reset próximamente');
  }
}