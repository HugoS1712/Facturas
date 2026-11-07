import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

import { TicketService } from '../../servicios/ticket-service';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './ticket.html',
  styleUrls: ['./ticket.scss']
})
export class Ticket {

  ticketNumber = '';

  equipo = '';
  urgencia = '';
  detalle = '';
  tipo = '';

  nombreHardware = '';
  nombreSoftware = '';

  usuarioLogueado = '';

  constructor(
    private ticketService: TicketService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.usuarioLogueado =
      localStorage.getItem(
        'usuarioLogueado'
      ) ||
      localStorage.getItem(
        'usuario'
      ) ||
      '';

  }

  onTipoChange(): void {

    this.nombreHardware = '';
    this.nombreSoftware = '';

  }

  async crearTicket(
    form: NgForm
  ): Promise<void> {

    if (form.invalid) {

      alert(
        'Complete todos los campos obligatorios'
      );

      return;

    }

    const numero =
      'TCK-' +
      new Date().getFullYear() +
      '-' +
      Date.now();

    let nombreExtra = '';

    if (this.tipo === 'Hardware') {

      nombreExtra =
        this.nombreHardware;

    }

    if (this.tipo === 'Software') {

      nombreExtra =
        this.nombreSoftware;

    }

    const nuevoTicket = {

      numero: numero,

      usuario:
        this.usuarioLogueado,

      equipo: this.equipo,

      urgencia: this.urgencia,

      tipo: this.tipo,

      nombre: nombreExtra,

      detalle: this.detalle,

      estado: 'abierto',

      responsable: '',

      fechaCreacion: new Date(),

      fechaActualizacion: new Date(),

      fechaCierre: null

    };

    try {

      await this.ticketService
        .agregarTicket(
          nuevoTicket
        );

      alert(
        '✅ Ticket creado correctamente'
      );

      this.router.navigate([
        '/tickets'
      ]);

    } catch (error) {

      console.error(
        error
      );

      alert(
        '❌ Error al guardar el ticket'
      );

    }

  }

}