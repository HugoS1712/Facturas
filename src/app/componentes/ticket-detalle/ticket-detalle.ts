import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { TicketService } from '../../servicios/ticket-service';

@Component({
  selector: 'app-ticket-detalle',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './ticket-detalle.html',
  styleUrls: ['./ticket-detalle.scss']
})
export class TicketDetalle implements OnInit {

  ticket: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {

    const idDoc =
      this.route.snapshot.paramMap.get('numero');

    console.log('ID:', idDoc);

    if (!idDoc) {
      return;
    }

    try {

      const ticket =
        await this.ticketService.getTicket(idDoc);

      console.log(
        'Ticket cargado:',
        ticket
      );

      this.ticket = ticket;

      this.cdr.detectChanges();

    } catch (error) {

      console.error(
        'Error cargando ticket:',
        error
      );

    }

  }

  async guardar(): Promise<void> {

    if (!this.ticket?.idDoc) {

      alert(
        'No se encontró el ticket'
      );

      return;
    }

    try {

      await this.ticketService.actualizarTicket(
        this.ticket.idDoc,
        {
          ...this.ticket,
          fechaActualizacion:
            new Date()
        }
      );

      this.router.navigate([
        '/tickets'
      ]);

    } catch (error) {

      console.error(
        'Error actualizando ticket:',
        error
      );

      alert(
        '❌ Error al actualizar el ticket'
      );

    }

  }

}