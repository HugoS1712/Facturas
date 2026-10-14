import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-activar-cuenta',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './activar-cuenta.html',
  styleUrl: './activar-cuenta.scss'
})
export class ActivarCuenta {

  token = '';
  password = '';

  mostrarPassword = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {

    this.token =
      this.route.snapshot.paramMap.get('token') || '';

  }

  togglePassword() {

    this.mostrarPassword =
      !this.mostrarPassword;

  }

  activarCuenta() {

    if (!this.password) {

      alert('Ingrese una contraseña');

      return;

    }

    this.http.post(
      'http://localhost:3000/activar-cuenta',
      {
        token: this.token,
        password: this.password
      }
    )
    .subscribe({

      next: () => {

        alert('Cuenta activada correctamente');

      },

      error: (error) => {

        console.error(error);

        alert('Error al activar la cuenta');

      }

    });

  }

}