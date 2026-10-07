import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-administracion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './administracion.html',
  styleUrl: './administracion.scss',
})
export class Administracion {

  nuevoNombre = '';
  nuevoEmail = '';
  nuevoRol = 'Usuario';

  usuarios = [
    {
      nombre: 'Hugo Sacks',
      email: '1712hugo@gmail.com',
      rol: 'Admin'
    },
    {
      nombre: 'Juan Perez',
      email: 'juan@gmail.com',
      rol: 'Usuario'
    },
    {
      nombre: 'Ana Lopez',
      email: 'ana@gmail.com',
      rol: 'Usuario'
    }
  ];

  agregarUsuario() {

    if (!this.nuevoNombre || !this.nuevoEmail) {

      alert('Complete nombre y email');

      return;

    }

    this.usuarios.push({
      nombre: this.nuevoNombre,
      email: this.nuevoEmail,
      rol: this.nuevoRol
    });

    this.nuevoNombre = '';
    this.nuevoEmail = '';
    this.nuevoRol = 'Usuario';

  }

  eliminarUsuario(usuario: any) {

    this.usuarios = this.usuarios.filter(
      u => u !== usuario
    );

  }

  cambiarRol(usuario: any) {

    if (usuario.rol === 'Admin') {

      usuario.rol = 'Usuario';

    } else {

      usuario.rol = 'Admin';

    }

  }

}