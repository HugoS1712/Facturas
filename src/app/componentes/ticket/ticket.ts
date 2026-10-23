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

  ngOnInit() {

    this.usuarioLogueado =
      localStorage.getItem('usuario') || '';

  }

  onTipoChange() {

    this.nombreHardware = '';
    this.nombreSoftware = '';

  }

  crearTicket(form: NgForm) {

    if (form.invalid) {
      return;
    }

    const usuarioLogueado =
      this.usuarioLogueado || 'desconocido';

    let contador =
      localStorage.getItem(
        'ticketCounter'
      );

    contador = contador
      ? (parseInt(contador) + 1).toString()
      : '1';

    localStorage.setItem(
      'ticketCounter',
      contador
    );

    const year =
      new Date().getFullYear();

    this.ticketNumber =
      `TCK-${year}-${contador.padStart(4, '0')}`;

    let nombreExtra = '';

    if (this.tipo === 'Hardware') {

      nombreExtra =
        this.nombreHardware;

    } else if (
      this.tipo === 'Software'
    ) {

      nombreExtra =
        this.nombreSoftware;

    }

    const nuevoTicket = {
      numero: this.ticketNumber,
      usuario: usuarioLogueado,
      equipo: this.equipo,
      urgencia: this.urgencia,
      tipo: this.tipo,
      nombre: nombreExtra,
      detalle: this.detalle,
      estado: 'abierto',
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    };

    this.ticketService.agregarTicket(
      nuevoTicket
    );

    alert(
      '✅ Ticket creado correctamente\n\n' +
      'Número: ' +
      this.ticketNumber
    );

    this.router.navigate([
      '/tickets'
    ]);

  }

}