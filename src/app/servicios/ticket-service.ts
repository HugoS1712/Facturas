import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private tickets: any[] = [];

  // ✅ LEER tickets (igual que factura)
  getTickets(): Observable<any[]> {
    return new Observable(obs => {
      const data = localStorage.getItem('tickets');
      this.tickets = data ? JSON.parse(data) : [];

      obs.next(this.tickets);
      obs.complete();
    });
  }

  // ✅ AGREGAR ticket (corregido)
  agregarTicket(ticket: any) {

    // 👉 SIEMPRE leo antes
    const data = localStorage.getItem('tickets');
    this.tickets = data ? JSON.parse(data) : [];

    // 👉 agrego el nuevo
    this.tickets.push(ticket);

    // 👉 guardo actualizado
    localStorage.setItem('tickets', JSON.stringify(this.tickets));
  }

}
``