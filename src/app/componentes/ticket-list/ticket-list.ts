import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../servicios/ticket-service';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-list.html',
  styleUrls: ['./ticket-list.scss']
})
export class TicketList {

  tickets: any[] = [];

  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    this.tickets = this.ticketService.getTickets();
  }
}
``