import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../../servicios/ticket-service';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './ticket-list.html',
  styleUrls: ['./ticket-list.scss']
})
export class TicketList {

  tickets: any[] = [];
  ticketsFiltrados: any[] = [];

  filtroEstado = '';
  filtroUsuario = '';

  constructor(
    private ticketService: TicketService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarTickets();

    // ✅ recarga al volver a la pantalla
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.cargarTickets();
      });
  }

  // ✅ CARGA DE TICKETS
  cargarTickets() {

    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    const todos = this.ticketService.getTickets();

    if (usuarioLogueado === 'admin') {
      this.tickets = todos;
    } else {
      this.tickets = todos.filter(
        t => t.usuario === usuarioLogueado
      );
    }

    // ✅ importante: actualizar lista filtrada
    this.ticketsFiltrados = this.tickets;
  }

  // ✅ FILTRO
  filtrar() {

    this.ticketsFiltrados = this.tickets.filter(t => {

      const cumpleEstado =
        this.filtroEstado === '' || t.estado === this.filtroEstado;

      const cumpleUsuario =
        this.filtroUsuario === '' ||
        t.usuario.toLowerCase().includes(this.filtroUsuario.toLowerCase());

      return cumpleEstado && cumpleUsuario;

    });

  }

  // ✅ navegar al detalle
  verTicket(numero: string) {
    this.router.navigate(['/tickets', numero]);
  }

}