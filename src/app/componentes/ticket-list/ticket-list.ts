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

    this.ticketService
      .getTickets()
      .subscribe((datos: any[]) => {

        console.log(
          'TICKETS RECIBIDOS:',
          datos.length
        );

        this.tickets = datos;

        this.ticketsFiltrados = datos;

      });

  }

  filtrar(): void {

    this.ticketsFiltrados =
      this.tickets.filter(
        (t: any) => {

          const cumpleEstado =
            !this.filtroEstado ||
            t.estado === this.filtroEstado;

          const cumpleUsuario =
            !this.filtroUsuario ||
            (t.usuario || '')
              .toLowerCase()
              .includes(
                this.filtroUsuario.toLowerCase()
              );

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