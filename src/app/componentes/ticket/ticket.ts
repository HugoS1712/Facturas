import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket',
  standalone: true, // 👈 CLAVE
  imports: [CommonModule, FormsModule], // 👈 CLAVE
  templateUrl: './ticket.html',
  styleUrls: ['./ticket.scss']
})
export class Ticket {

  ticketNumber = '';

  usuario = '';
  equipo = '';
  urgencia = '';
  detalle = '';
  tipo = '';

  crearTicket() {

    console.log('CLICK OK');
  }

}
