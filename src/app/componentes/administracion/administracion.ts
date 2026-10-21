import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  HttpClient,
  HttpClientModule
} from '@angular/common/http';

@Component({
  selector: 'app-administracion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './administracion.html',
  styleUrl: './administracion.scss'
})
export class Administracion implements OnInit {

  private apiUrl = 'https://factura-api-beta.vercel.app';

  nuevoNombre = '';
  nuevoEmail = '';
  nuevoRol = 'Usuario';

  usuarios: any[] = [];

  editando = false;

  usuarioEditando: any = {
    id: null,
    nombre: '',
    email: '',
    rol: 'Usuario'
  };

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {

    console.log('Cargando usuarios...');

    this.http
      .get<any[]>(`${this.apiUrl}/usuarios`)
      .subscribe({

        next: (data) => {

          console.log('Datos recibidos:', data);

          this.usuarios = data.map(usuario => ({
            id: usuario.id,
            nombre: usuario.username,
            email: usuario.email,
            rol: usuario.rol
          }));

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error('Error GET:', error);

        }

      });

  }

  agregarUsuario(): void {

    if (!this.nuevoNombre || !this.nuevoEmail) {

      alert('Complete nombre y email');
      return;

    }

    this.http.post(
      `${this.apiUrl}/usuarios`,
      {
        username: this.nuevoNombre,
        email: this.nuevoEmail,
        password: '',
        rol: this.nuevoRol
      }
    )
    .subscribe({

      next: () => {

        alert('Usuario guardado correctamente');

        this.nuevoNombre = '';
        this.nuevoEmail = '';
        this.nuevoRol = 'Usuario';

        this.cargarUsuarios();

      },

      error: (error) => {

        console.error('Error POST:', error);

        alert('Error al guardar usuario');

      }

    });

  }

  editarUsuario(usuario: any): void {

    this.editando = true;

    this.usuarioEditando = {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol
    };

  }

  guardarEdicion(): void {

    this.http.put(
      `${this.apiUrl}/usuarios/${this.usuarioEditando.id}`,
      {
        username: this.usuarioEditando.nombre,
        email: this.usuarioEditando.email,
        rol: this.usuarioEditando.rol
      }
    )
    .subscribe({

      next: () => {

        alert('Usuario actualizado');

        this.editando = false;

        this.cargarUsuarios();

      },

      error: (error) => {

        console.error(error);

        alert('Error al actualizar usuario');

      }

    });

  }

  cancelarEdicion(): void {

    this.editando = false;

    this.usuarioEditando = {
      id: null,
      nombre: '',
      email: '',
      rol: 'Usuario'
    };

  }

  eliminarUsuario(usuario: any): void {

    if (!confirm(`¿Eliminar a ${usuario.nombre}?`)) {
      return;
    }

    this.http
      .delete(`${this.apiUrl}/usuarios/${usuario.id}`)
      .subscribe({

        next: () => {

          alert('Usuario eliminado');

          this.cargarUsuarios();

        },

        error: (error) => {

          console.error('Error DELETE:', error);

          alert('Error al eliminar');

        }

      });

  }

  cambiarRol(usuario: any): void {

    usuario.rol =
      usuario.rol === 'Admin'
        ? 'Usuario'
        : 'Admin';

  }

  exportarCSV(): void {

    const encabezados = [
      'Nombre',
      'Email',
      'Rol'
    ];

    const filas = this.usuarios.map(usuario => [
      usuario.nombre,
      usuario.email,
      usuario.rol
    ]);

    const contenidoCSV = [
      encabezados.join(','),
      ...filas.map(fila => fila.join(','))
    ].join('\n');

    const blob = new Blob(
      [contenidoCSV],
      {
        type: 'text/csv;charset=utf-8;'
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement('a');

    link.href = url;
    link.download = 'usuarios.csv';

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);

  }

}