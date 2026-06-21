import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../../servicios/ticket-service';

@Component({
  selector: 'app-ticket-detalle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ticket-detalle.html',
  styleUrls: ['./ticket-detalle.scss']
})
export class TicketDetalle {

  ticket: any;

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) { }

  ngOnInit() {
    const numero = this.route.snapshot.paramMap.get('numero');
    this.ticket = this.ticketService.getTicket(numero!);
  }

  guardar() {
    this.ticketService.actualizarTicket(this.ticket);
    alert('✅ Ticket actualizado');
  }
}