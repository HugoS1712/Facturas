import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { TicketService } from '../../servicios/ticket-service';

@Component({
  selector: 'app-ticket-detalle',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './ticket-detalle.html',
  styleUrls: ['./ticket-detalle.scss']
})
export class TicketDetalle {

  ticket: any = null;

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) { }

  ngOnInit(): void {

    const numero =
      this.route.snapshot.paramMap.get(
        'numero'
      );

    this.ticketService
      .getTickets()
      .subscribe(
        (tickets: any[]) => {

          this.ticket =
            tickets.find(
              (t: any) =>
                t.numero === numero
            );

        }
      );

  }

  async guardar(): Promise<void> {

    if (!this.ticket) {

      alert(
        'No se encontró el ticket'
      );

      return;

    }

    if (!this.ticket.idDoc) {

      alert(
        'El ticket no tiene idDoc'
      );

      return;

    }

    try {

      await this.ticketService
        .actualizarTicket(
          this.ticket.idDoc,
          {
            ...this.ticket,
            fechaActualizacion:
              new Date()
          }
        );

      alert(
        '✅ Ticket actualizado correctamente'
      );

    } catch (error) {

      console.error(
        'Error actualizando ticket:',
        error
      );

      alert(
        '❌ Error al actualizar el ticket'
      );

    }

  }

}