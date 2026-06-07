import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-list.html',
  styleUrls: ['./ticket-list.scss']
})
export class TicketList {

  // ✅ ESTO FALTABA
  tickets: any[] = [];

  ngOnInit() {
    const data = localStorage.getItem('tickets');

    if (data) {
      this.tickets = JSON.parse(data);
    }
  }
}
