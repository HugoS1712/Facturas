import { Component } from '@angular/core';
import { Factura } from '../../clases/factura';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FacturaService } from '../../servicios/factura-service';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './lista.html',
  styleUrls: ['./lista.scss']
})
export class Lista {

  public factura: Factura[] = [];
  public facturaOriginal: Factura[] = [];

  textoBusqueda = '';

  constructor(
    public servicio: FacturaService
  ) {

    this.servicio
      .retornarFactura()
      .subscribe((data: Factura[]) => {

        this.factura = data;
        this.facturaOriginal = data;

      });

  }

  mostrarTodas(): void {

    this.factura = [
      ...this.facturaOriginal
    ];

  }

  filtrarImporteMayor(): void {

    this.factura =
      this.facturaOriginal.filter(
        (f: any) => f.total > 10000
      );

  }

  editarFactura(factura: Factura): void {

    console.log(
      'Editar factura:',
      factura
    );

    alert(
      'Editar factura N° ' +
      factura.numero
    );

  }

}