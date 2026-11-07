import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario';

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

  obtenerUsuario(): Usuario {

    return {

      email:
        localStorage.getItem(
          'usuarioLogueado'
        ) || '',

      nombre:
        localStorage.getItem(
          'nombreUsuario'
        ) || '',

      foto:
        localStorage.getItem(
          'fotoUsuario'
        ) || '',

      uid:
        localStorage.getItem(
          'uidUsuario'
        ) || '',

      rol:
        localStorage.getItem(
          'rol'
        ) || 'usuario'

    };

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
    localStorage.removeItem(
      'rol'
    );
  }

}