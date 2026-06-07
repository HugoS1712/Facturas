import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  ngOnInit() {
    const data = localStorage.getItem('tickets');

    if (data) {
      this.tickets = JSON.parse(data);
    }
  }

  crearTicket() {
    let contador = localStorage.getItem('ticketCounter');

    if (!contador) {
      contador = '1';
    } else {
      contador = (parseInt(contador) + 1).toString();
    }

    localStorage.setItem('ticketCounter', contador);

    const year = new Date().getFullYear();

    this.ticketNumber = `TCK-${year}-${contador.padStart(4, '0')}`;

    // ✅ Crear objeto del ticket
    const nuevoTicket = {
      numero: this.ticketNumber,
      usuario: this.usuario,
      equipo: this.equipo,
      urgencia: this.urgencia,
      tipo: this.tipo,
      detalle: this.detalle
    };

    // ✅ Mostrar en pantalla inmediatamente
    this.tickets.push(nuevoTicket);

    // ✅ Guardar en localStorage
    let ticketsStorage = localStorage.getItem('tickets');

    if (ticketsStorage) {
      const lista = JSON.parse(ticketsStorage);
      lista.push(nuevoTicket);
      localStorage.setItem('tickets', JSON.stringify(lista));
    } else {
      localStorage.setItem('tickets', JSON.stringify([nuevoTicket]));
    }

    // ✅ Limpiar formulario
    this.usuario = '';
    this.equipo = '';
    this.urgencia = '';
    this.tipo = '';
    this.detalle = '';
  }
}