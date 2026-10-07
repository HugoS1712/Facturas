import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MensajeForo } from '../../clases/mensaje-foro';

@Component({
  selector: 'app-foro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './foro.html',
  styleUrl: './foro.scss',
})
export class Foro {

  public mensajeForo: MensajeForo | null = null;

  public mensajes: MensajeForo[] = [];

  constructor() {

    this.mensajeForo = {
      id: 0,
      idUsuario: 1,
      nombreUsuario: '',
      mensaje: '',
      fecha: new Date()
    };

  }

  public enviar() {

    if (!this.mensajeForo) {
      return;
    }

    if (!this.mensajeForo.mensaje.trim()) {
      return;
    }

    this.mensajes.push({

      id: this.mensajes.length + 1,

      idUsuario: 1,

      nombreUsuario:
        localStorage.getItem('nombreUsuario') ??
        'Anónimo',

      mensaje: this.mensajeForo.mensaje,

      fecha: new Date()

    });

    this.mensajeForo.mensaje = '';

  }

}