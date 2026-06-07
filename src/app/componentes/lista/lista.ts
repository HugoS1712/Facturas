import { Component } from '@angular/core';
import { Factura, TipoFactura } from '../../clases/factura';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Detallefactura } from '../../clases/detallefactura';

import { RouterModule } from '@angular/router';
import { FacturaService } from '../../servicios/factura-service';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './lista.html',
  styleUrl: './lista.scss',
})

export class Lista {
  public factura: Factura[] = [];


  constructor(public servicio: FacturaService) {

    this.servicio.retornarFactura().subscribe((data: Factura[]) => {
      this.factura = data;
    });

  }
}
