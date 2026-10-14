import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MensajeForo } from '../../clases/mensaje-foro';
import { ForoService } from '../../servicios/foro.service';

@Component({
  selector: 'app-foro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './foro.html',
  styleUrls: ['./foro.scss']
})
export class Foro implements OnInit {

  public mensajeForo: MensajeForo = {
    id: 0,
    idUsuario: 1,
    nombreUsuario: '',
    mensaje: '',
    fecha: new Date()
  };

  public mensajes: any[] = [];

  constructor(
    private foroService: ForoService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.foroService
      .obtenerMensajes()
      .subscribe((datos: any[]) => {

        this.mensajes = [...datos];

        this.cdr.detectChanges();

      });

  }

  public async enviar(): Promise<void> {

    const texto = this.mensajeForo.mensaje.trim();

    if (!texto) {
      return;
    }

    try {

      await this.foroService.agregarMensaje({

        idUsuario: 1,

        nombreUsuario:
          localStorage.getItem('nombreUsuario') ??
          'Anónimo',

        mensaje: texto,

        fecha: new Date()

      });

      this.mensajeForo.mensaje = '';

      this.cdr.detectChanges();

    } catch (error) {

      console.error(
        'Error guardando mensaje:',
        error
      );

    }

  }

}