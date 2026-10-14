import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private tickets: any[] = [];

  // ✅ Obtener todos los tickets
  getTickets() {
    const data = localStorage.getItem('tickets');
    this.tickets = data ? JSON.parse(data) : [];
    return this.tickets;
  }

  // ✅ Agregar ticket nuevo
  agregarTicket(ticket: any) {
    const data = localStorage.getItem('tickets');
    this.tickets = data ? JSON.parse(data) : [];

    // ✅ datos iniciales del sistema
    ticket.estado = 'abierto';
    ticket.responsable = '';
    ticket.fechaCreacion = new Date();
    ticket.fechaActualizacion = new Date();
    ticket.fechaCierre = null;

    this.tickets.push(ticket);

    localStorage.setItem('tickets', JSON.stringify(this.tickets));
  }

  // ✅ Buscar ticket por número (CORREGIDO)
  getTicket(numero: string) {
    const tickets = this.getTickets();

    return tickets.find(t =>
      t.numero?.toString().trim().toLowerCase() ===
      numero?.toString().trim().toLowerCase()
    );
  }

  // ✅ Actualizar ticket (CORREGIDO y robusto)
  actualizarTicket(ticketActualizado: any) {
    const tickets = this.getTickets();

    const index = tickets.findIndex(t =>
      t.numero?.toString().trim().toLowerCase() ===
      ticketActualizado.numero?.toString().trim().toLowerCase()
    );

    if (index !== -1) {

      // ✅ actualizar fecha
      ticketActualizado.fechaActualizacion = new Date();

      // ✅ si se cierra, guardar fecha de cierre
      if (ticketActualizado.estado === 'cerrado' && !ticketActualizado.fechaCierre) {
        ticketActualizado.fechaCierre = new Date();
      }

      tickets[index] = ticketActualizado;

      localStorage.setItem('tickets', JSON.stringify(tickets));
    }
  }
}