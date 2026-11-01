import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterModule,
  Router
} from '@angular/router';

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
  filtroUsuario = '';

  constructor(
    private ticketService: TicketService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.cargarTickets();

  }

  cargarTickets(): void {

    this.ticketService
      .getTickets()
      .subscribe({

        next: (datos: any[]) => {

          this.tickets = datos.filter(
            (t: any) =>
              t &&
              t.numero &&
              t.usuario
          );

          this.ticketsFiltrados = [
            ...this.tickets
          ];

          console.log(
            'Tickets cargados:',
            this.tickets
          );

        },

        error: (error) => {

          console.error(
            'Error cargando tickets:',
            error
          );

        }

      });

  }

  filtrar(): void {

    const estado =
      this.filtroEstado
        .trim()
        .toLowerCase();

    const usuario =
      this.filtroUsuario
        .trim()
        .toLowerCase();

    this.ticketsFiltrados =
      this.tickets.filter(
        (t: any) => {

          const cumpleEstado =
            estado === '' ||
            (t.estado || '')
              .toLowerCase() === estado;

          const cumpleUsuario =
            usuario === '' ||
            (t.usuario || '')
              .toLowerCase()
              .includes(usuario);

          return (
            cumpleEstado &&
            cumpleUsuario
          );

        }
      );

  }

  mostrarTodas(): void {

    this.filtroEstado = '';
    this.filtroUsuario = '';

    this.ticketsFiltrados = [
      ...this.tickets
    ];

  }

  verTicket(
    numero: string
  ): void {

    this.router.navigate([
      '/tickets',
      numero
    ]);

  }

}