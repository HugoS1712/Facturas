import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Factura, TipoFactura } from '../../clases/factura';
import { Detallefactura } from '../../clases/detallefactura';
import { RouterModule } from '@angular/router';
import { FacturaService } from '../../servicios/factura-service';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './factura.html',
  styleUrls: ['./factura.scss']
})
export class FacturaComponent {

  public facturas: Factura[] = [];
  public EtipoFactura = TipoFactura;
  public claseFactura: string = 'contenedor';
  public claseDetalle: string = 'detalle';

  constructor(public servicio: FacturaService) {
    this.facturas = [];
  }

  ngOnInit() {

    const tipoInicial = TipoFactura.A;

    this.servicio
      .obtenerProximoNumero(tipoInicial)
      .subscribe((numero: number) => {

        const nuevaFactura = new Factura(
          new Date(),
          numero,
          tipoInicial,
          ''
        );

        this.facturas.push(nuevaFactura);

      });

  }

  mostrarLetra(valor: TipoFactura): string {

    return valor === TipoFactura.A
      ? 'A'
      : valor === TipoFactura.B
      ? 'B'
      : 'C';

  }

  mostrarFecha() {

    this.facturas[0].fecha.setDate(
      this.facturas[0].fecha.getDate() + 1
    );

    alert(this.facturas[0].fecha);

  }

  agregarDetalle() {

    const nuevoDetalle = new Detallefactura();

    nuevoDetalle.cantidad = 1;
    nuevoDetalle.descripcion = 'Producto 1';
    nuevoDetalle.precioUnitario = 2500;

    this.facturas[0].detalles.push(
      nuevoDetalle
    );

    this.facturas[0].calcularTotales();

  }

  guardar() {

    if (!this.facturas[0].receptor?.trim()) {

      alert('Debe ingresar un cliente');

      return;

    }

    if (
      this.facturas[0].detalles.length === 0
    ) {

      alert(
        'Debe agregar al menos un detalle'
      );

      return;

    }

    this.facturas[0].calcularTotales();

    this.servicio.agregarFactura(
      this.facturas[0]
    );

    alert(
      '✅ Factura guardada correctamente'
    );

    const tipoActual =
      this.facturas[0].tipo;

    this.servicio
      .obtenerProximoNumero(tipoActual)
      .subscribe((numero: number) => {

        this.facturas = [];

        const nuevaFactura = new Factura(
          new Date(),
          numero,
          tipoActual,
          ''
        );

        this.facturas.push(
          nuevaFactura
        );

      });

  }

  cambiarFondo() {

    this.claseFactura =
      this.facturas[0].tipo === this.EtipoFactura.A
        ? 'cuerpo-contraste'
        : this.facturas[0].tipo === this.EtipoFactura.B
        ? 'cuerpo-pastel'
        : 'contenedor';

  }

  imprimir() {

    window.print();

  }

}