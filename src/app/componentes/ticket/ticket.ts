import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TicketService } from '../../servicios/ticket-service';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './ticket.html',
  styleUrls: ['./ticket.scss']
})
export class Ticket {

  ticketNumber = '';

  equipo = '';
  urgencia = '';
  detalle = '';
  tipo = '';

  usuarioLogueado = ''; // ✅ IMPORTANTE

  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    // ✅ traer usuario desde localStorage
    this.usuarioLogueado = localStorage.getItem('usuarioLogueado') || '';
  }

  crearTicket(form: NgForm) {

    if (form.invalid) return;

    const usuarioLogueado = this.usuarioLogueado || 'desconocido';

    let contador = localStorage.getItem('ticketCounter');
    contador = contador ? (parseInt(contador) + 1).toString() : '1';

    localStorage.setItem('ticketCounter', contador);

    const year = new Date().getFullYear();
    this.ticketNumber = `TCK-${year}-${contador.padStart(4, '0')}`;

    const nuevoTicket = {
      numero: this.ticketNumber,
      usuario: usuarioLogueado,
      equipo: this.equipo,
      urgencia: this.urgencia,
      tipo: this.tipo,
      detalle: this.detalle
    };

    this.ticketService.agregarTicket(nuevoTicket);

    form.resetForm();
  }
}