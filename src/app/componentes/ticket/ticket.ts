
import { Component } from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.html',
  styleUrls: ['./ticket.scss'] // ✅ CORRECTO
})


export class Ticket {
  ticketNumber = 'TCK-' + Math.floor(Math.random() * 100000);
}

