import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../../servicios/ticket-service';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './ticket-list.html',
  styleUrls: ['./ticket-list.scss']
})
export class TicketList implements OnInit {

  tickets: any[] = [];
  ticketsFiltrados: any[] = [];

  filtroEstado = '';
  filtroUrgencia = '';
  textoBusqueda = '';

  cargando = true;

  constructor(
    private ticketService: TicketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarTickets();
  }

  cargarTickets(): void {

    this.ticketService
      .getTickets()
      .subscribe({
        next: (datos: any[]) => {

          this.tickets = [...datos];
          this.ticketsFiltrados = [...datos];

          this.cargando = false;
        },
        error: (error) => {

          console.error(
            'Error cargando tickets:',
            error
          );

          this.cargando = false;
        }
      });
  }

  filtrar(): void {

    this.ticketsFiltrados =
      this.tickets.filter((t: any) => {

        const cumpleEstado =
          !this.filtroEstado ||
          t.estado === this.filtroEstado;

        const cumpleUrgencia =
          !this.filtroUrgencia ||
          t.urgencia === this.filtroUrgencia;

        const texto =
          this.textoBusqueda.toLowerCase();

        const cumpleBusqueda =
          texto === '' ||
          (t.numero || '')
            .toLowerCase()
            .includes(texto) ||
          (t.usuario || '')
            .toLowerCase()
            .includes(texto) ||
          (t.equipo || '')
            .toLowerCase()
            .includes(texto) ||
          (t.nombre || '')
            .toLowerCase()
            .includes(texto);

        return (
          cumpleEstado &&
          cumpleUrgencia &&
          cumpleBusqueda
        );

      });
  }

  mostrarTodas(): void {

    this.filtroEstado = '';
    this.filtroUrgencia = '';
    this.textoBusqueda = '';

    this.ticketsFiltrados = [
      ...this.tickets
    ];
  }

  verTicket(idDoc: string): void {

    this.router.navigate([
      '/tickets',
      idDoc
    ]);
  }
}