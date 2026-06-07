import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../../servicios/ticket-service';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ticket.html',
  styleUrls: ['./ticket.scss']
})
export class Ticket {

  ticketNumber = '';

  usuario = '';
  equipo = '';
  urgencia = '';
  detalle = '';
  tipo = '';

  tickets: any[] = [];

  // ✅ usar service
  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    this.ticketService.getTickets().subscribe(data => {
      this.tickets = data;
    });
  }

  crearTicket() {

    let contador = localStorage.getItem('ticketCounter');

    if (!contador) {
      contador = '1';
    } else {
      contador = (parseInt(contador) + 1).toString();
    }

    localStorage.setItem('ticketCounter', contador);

    const year = new Date().getFullYear();

    this.ticketNumber = `TCK-${year}-${contador.padStart(4, '0')}`;

    // ✅ objeto ticket
    const nuevoTicket = {
      numero: this.ticketNumber,
      usuario: this.usuario,
      equipo: this.equipo,
      urgencia: this.urgencia,
      tipo: this.tipo,
      detalle: this.detalle
    };

    // ✅ USAR SERVICE (clave)
    this.ticketService.agregarTicket(nuevoTicket);

    // ✅ actualizar UI opcional (instantáneo)
    this.tickets.push(nuevoTicket);

    // ✅ limpiar formulario
    this.usuario = '';
    this.equipo = '';
    this.urgencia = '';
    this.tipo = '';
    this.detalle = '';
  }
}
``