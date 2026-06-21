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

  usuario = '';
  equipo = '';
  urgencia = '';
  detalle = '';
  tipo = '';

  tickets: any[] = [];

  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    this.tickets = this.ticketService.getTickets();
  }

  crearTicket(form: NgForm) {

    // ✅ VALIDACIÓN
    if (form.invalid) {
      return;
    }

    // ✅ GENERAR NÚMERO
    let contador = localStorage.getItem('ticketCounter');

    if (!contador) {
      contador = '1';
    } else {
      contador = (parseInt(contador) + 1).toString();
    }

    localStorage.setItem('ticketCounter', contador);

    const year = new Date().getFullYear();
    this.ticketNumber = `TCK-${year}-${contador.padStart(4, '0')}`;

    const nuevoTicket = {
      numero: this.ticketNumber,
      usuario: this.usuario,
      equipo: this.equipo,
      urgencia: this.urgencia,
      tipo: this.tipo,
      detalle: this.detalle
    };

    // ✅ GUARDAR SOLO EN EL SERVICE
    this.ticketService.agregarTicket(nuevoTicket);

    // ❌ SACAMOS ESTA LÍNEA (duplicaba)
    // this.tickets.push(nuevoTicket);

    // ✅ LIMPIAR FORM
    form.resetForm();
  }

  editar(ticket: any) {
    this.usuario = ticket.usuario;
    this.equipo = ticket.equipo;
    this.urgencia = ticket.urgencia;
    this.tipo = ticket.tipo;
    this.detalle = ticket.detalle;
  }

  filtrarAlta() {
    this.tickets = this.tickets.filter(t => t.urgencia === 'alta');
  }

  cargarTodos() {
    this.tickets = this.ticketService.getTickets();
  }
}