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

<<<<<<< HEAD
  cargando = true;

=======
>>>>>>> 44784c20de82be3a75a5d666c8cf004d1beb60ab
  constructor(
    private ticketService: TicketService,
    private router: Router
  ) { }

  ngOnInit(): void {

<<<<<<< HEAD
    this.cargarTickets();

  }

  cargarTickets(): void {

    const usuarioLogueado =
      localStorage.getItem(
        'usuarioLogueado'
      );

    const rol =
      localStorage.getItem(
        'rol'
      );

=======
>>>>>>> 44784c20de82be3a75a5d666c8cf004d1beb60ab
    this.ticketService
      .getTickets()
      .subscribe(
        (datos: any[]) => {

          console.log(
            'DATOS:',
            datos
          );

          console.log(
            'CANTIDAD:',
            datos.length
          );

<<<<<<< HEAD
          if (rol === 'admin') {

            this.tickets = [
              ...datos
            ];

          } else {

            this.tickets =
              datos.filter(
                t =>
                  t.usuario ===
                  usuarioLogueado
              );

          }

          this.ticketsFiltrados = [
            ...this.tickets
          ];

          this.cargando = false;
=======
          this.tickets = [
            ...datos
          ];

          this.ticketsFiltrados = [
            ...datos
          ];
>>>>>>> 44784c20de82be3a75a5d666c8cf004d1beb60ab

        }
      );

  }

  filtrar(): void {

    this.ticketsFiltrados =
      this.tickets.filter(
        (t: any) => {

          const cumpleEstado =
            this.filtroEstado === '' ||
<<<<<<< HEAD
            t.estado ===
            this.filtroEstado;
=======
            t.estado === this.filtroEstado;
>>>>>>> 44784c20de82be3a75a5d666c8cf004d1beb60ab

          const cumpleUsuario =
            this.filtroUsuario === '' ||
            (t.usuario || '')
              .toLowerCase()
              .includes(
                this.filtroUsuario
                  .toLowerCase()
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