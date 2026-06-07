import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class Login {

  usuario = '';
  password = '';


  login() {
    if (this.usuario === 'admin' && this.password === '1234') {
      localStorage.setItem('logueado', 'true');

      console.log('LOGUEADO OK'); // 👈 debug

      window.location.href = '/ticket';
    } else {
      alert('Usuario o contraseña incorrectos');

    }
  }
}