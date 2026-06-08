import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private tickets: any[] = [];

  getTickets() {
    const data = localStorage.getItem('tickets');
    this.tickets = data ? JSON.parse(data) : [];
    return this.tickets;
  }

  agregarTicket(ticket: any) {
    const data = localStorage.getItem('tickets');
    this.tickets = data ? JSON.parse(data) : [];

    this.tickets.push(ticket);

    localStorage.setItem('tickets', JSON.stringify(this.tickets));
  }

}
``