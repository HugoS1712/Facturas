import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TicketService } from '../../servicios/ticket-service';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ticket-list.html',
  styleUrls: ['./ticket-list.scss']
})
export class TicketList {

  tickets: any[] = [];

  constructor(
    private ticketService: TicketService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarTickets();

    // ✅ Se ejecuta cada vez que volvés a esta pantalla
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.cargarTickets();
      });
  }

  // ✅ FUNCIÓN CORREGIDA (LA CLAVE)
  cargarTickets() {

    const usuarioLogueado = localStorage.getItem('usuarioLogueado');

    const todos = this.ticketService.getTickets();

    if (usuarioLogueado === 'admin') {
      this.tickets = todos;  // ✅ admin ve todo
    } else {
      this.tickets = todos.filter(
        t => t.usuario === usuarioLogueado
      ); // ✅ usuario ve solo lo suyo
    }
  }

  // ✅ navegar al detalle
  verTicket(numero: string) {
    this.router.navigate(['/tickets', numero]);
  }
}