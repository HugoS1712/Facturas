import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  guardarUsuario(
    email: string,
    nombre: string,
    foto: string,
    uid: string
  ) {

    localStorage.setItem(
      'usuarioLogueado',
      email
    );

    localStorage.setItem(
      'nombreUsuario',
      nombre
    );

    localStorage.setItem(
      'fotoUsuario',
      foto
    );

    localStorage.setItem(
      'uidUsuario',
      uid
    );

    localStorage.setItem(
      'logueado',
      'true'
    );

  }

  logout() {

    localStorage.removeItem(
      'usuarioLogueado'
    );

    localStorage.removeItem(
      'nombreUsuario'
    );

    localStorage.removeItem(
      'fotoUsuario'
    );

    localStorage.removeItem(
      'uidUsuario'
    );

    localStorage.removeItem(
      'logueado'
    );

  }

}