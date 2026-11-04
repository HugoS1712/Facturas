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

        console.log('RECIBIDOS:', datos);

        this.ticketsFiltrados = [...datos];

      });

  }

  filtrar(): void {

    // vacío por ahora

  }

  verTicket(numero: string): void {

    this.router.navigate([
      '/tickets',
      numero
    ]);

  }

}