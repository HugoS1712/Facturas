import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Auth } from '@angular/fire/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { UsuarioService } from '../../servicios/usuario-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login implements OnInit {

  private auth = inject(Auth);
  private router = inject(Router);
  private usuarioService = inject(UsuarioService);
  private http = inject(HttpClient);

  usuario = '';
  password = '';

  mensajeError = '';

  colorFondo = '';

  mostrarPassword = false;

  usuarios = [
    { usuario: 'admin', password: '1234' },
    { usuario: 'hugo', password: '1234' },
    { usuario: 'soporte', password: '1234' }
  ];

  ngOnInit() {

    if (localStorage.getItem('logueado') === 'true') {

      this.router.navigate(['/inicio']);
      return;

    }

    const dia = new Date().getDay();

    const colores = [
      'linear-gradient(135deg, #1e3a8a, #38bdf8)',
      'linear-gradient(135deg, #0f172a, #1e293b)',
      'linear-gradient(135deg, #1d4ed8, #9333ea)',
      'linear-gradient(135deg, #047857, #22c55e)',
      'linear-gradient(135deg, #b45309, #f59e0b)',
      'linear-gradient(135deg, #7c3aed, #ec4899)',
      'linear-gradient(135deg, #be123c, #fb7185)'
    ];

    this.colorFondo = colores[dia];

  }

  togglePassword() {

    this.mostrarPassword =
      !this.mostrarPassword;

  }

  login() {

    this.mensajeError = '';

    const user = this.usuarios.find(u =>
      u.usuario === this.usuario &&
      u.password === this.password
    );

    if (user) {

      this.usuarioService.guardarUsuario(
        user.usuario,
        user.usuario,
        '',
        ''
      );

      localStorage.setItem(
        'usuario',
        user.usuario
      );

      localStorage.setItem(
        'rol',
        'admin'
      );

      localStorage.setItem(
        'logueado',
        'true'
      );

      this.router.navigate(['/inicio']);

    } else {

      this.mensajeError =
        'Usuario o contraseña incorrectos';

    }

  }

  async loguearConGoogle() {

    this.mensajeError = '';

    try {

      const provider =
        new GoogleAuthProvider();

      provider.setCustomParameters({
        prompt: 'select_account'
      });

      const resultado =
        await signInWithPopup(
          this.auth,
          provider
        );

      console.log('GOOGLE LOGIN OK', resultado);

      const email =
        resultado.user.email ?? '';

      this.http.post<any>(
        'https://factura-api-beta.vercel.app/validar-google',
        {
          email
        }
      )
      .subscribe({

        next: (respuesta) => {

          console.log(
            'VALIDACION OK',
            respuesta
          );

          this.usuarioService.guardarUsuario(
            resultado.user.email ?? '',
            resultado.user.displayName ?? '',
            resultado.user.photoURL ?? '',
            resultado.user.uid
          );

          localStorage.setItem(
            'usuario',
            resultado.user.email ?? ''
          );

          localStorage.setItem(
            'rol',
            respuesta.usuario.rol
          );

          localStorage.setItem(
            'logueado',
            'true'
          );

          this.router.navigate(
            ['/inicio']
          );

        },

        error: (error) => {

          console.error(
            'ERROR VALIDAR GOOGLE',
            error
          );

          alert(
            'ERROR VALIDAR GOOGLE:\n\n' +
            JSON.stringify(error, null, 2)
          );

          this.mensajeError =
            'Usuario no autorizado. Solicite acceso al administrador.';

        }

      });

    } catch (error: any) {

      console.error(
        'ERROR GOOGLE',
        error
      );

      alert(
        'ERROR GOOGLE:\n\n' +
        (error?.message || JSON.stringify(error))
      );

      this.mensajeError =
        error?.message ||
        'Error al iniciar sesión con Google';

    }

  }

}