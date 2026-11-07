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
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './factura.html',
  styleUrls: ['./factura.scss']
})
export class FacturaComponent {

  public facturas: Factura[] = [];

  public EtipoFactura = TipoFactura;

  public claseFactura = 'contenedor';
  public claseDetalle = 'detalle';

  public modoEdicion = false;

  constructor(
    public servicio: FacturaService
  ) {

    this.facturas = [];

  }

  ngOnInit() {

    const facturaEditar =
      localStorage.getItem(
        'facturaEditar'
      );

    if (facturaEditar) {

      this.facturas = [
        JSON.parse(facturaEditar)
      ];

      this.modoEdicion = true;

      localStorage.removeItem(
        'facturaEditar'
      );

      return;

    }

    const tipoInicial =
      TipoFactura.A;

    this.servicio
      .obtenerProximoNumero(
        tipoInicial
      )
      .subscribe(
        (numero: number) => {

          const nuevaFactura =
            new Factura(
              new Date(),
              numero,
              tipoInicial,
              ''
            );

          this.facturas.push(
            nuevaFactura
          );

        }
      );

  }

  mostrarLetra(
    valor: TipoFactura
  ): string {

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

    alert(
      this.facturas[0].fecha
    );

  }

  agregarDetalle() {

    const nuevoDetalle =
      new Detallefactura();

    nuevoDetalle.cantidad = 1;
    nuevoDetalle.descripcion = 'Producto 1';
    nuevoDetalle.precioUnitario = 2500;

    this.facturas[0].detalles.push(
      nuevoDetalle
    );

    this.facturas[0].calcularTotales();

  }

  guardar() {

    if (
      !this.facturas[0].receptor?.trim()
    ) {

      alert(
        'Debe ingresar un cliente'
      );

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

    this.facturas[0]
      .calcularTotales();

    if (this.modoEdicion) {

      alert(
        '✅ Factura actualizada correctamente'
      );

      this.modoEdicion = false;

      return;

    }

    this.servicio.agregarFactura(
      this.facturas[0]
    );

    alert(
      '✅ Factura guardada correctamente'
    );

    const tipoActual =
      this.facturas[0].tipo;

    this.servicio
      .obtenerProximoNumero(
        tipoActual
      )
      .subscribe(
        (numero: number) => {

          this.facturas = [];

          const nuevaFactura =
            new Factura(
              new Date(),
              numero,
              tipoActual,
              ''
            );

          this.facturas.push(
            nuevaFactura
          );

        }
      );

  }

  cambiarFondo() {

    this.claseFactura =
      this.facturas[0].tipo ===
      this.EtipoFactura.A
        ? 'cuerpo-contraste'
        : this.facturas[0].tipo ===
          this.EtipoFactura.B
        ? 'cuerpo-pastel'
        : 'contenedor';

  }

  imprimir(): void {

    const factura =
      document.querySelector(
        '.factura'
      ) as HTMLElement;

    if (!factura) {

      alert(
        'No se encontró la factura'
      );

      return;

    }

    const ventana =
      window.open(
        '',
        '_blank',
        'width=1000,height=800'
      );

    if (!ventana) {

      return;

    }

    ventana.document.write(`
      <!DOCTYPE html>
      <html>
      <head>

        <title>Factura</title>

        <style>

          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            color: #000;
          }

          .factura {
            width: 100%;
          }

          button,
          select,
          .acciones {
            display: none !important;
          }

          input {
            border: none !important;
            background: transparent !important;
            width: auto !important;
            color: black !important;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }

          th,
          td {
            border: 1px solid #000;
            padding: 8px;
          }

          th {
            background: #ececec;
          }

          .encabezado {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
          }

          .letra {
            border: 3px solid #000;
            width: 80px;
            height: 80px;
            font-size: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: auto;
          }

          .totales {
            width: 300px;
            margin-left: auto;
            margin-top: 20px;
          }

          .linea {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
          }

          .total-final {
            border-top: 2px solid #000;
            padding-top: 10px;
            margin-top: 10px;
            font-weight: bold;
            font-size: 18px;
          }

        </style>

      </head>

      <body>

        <div class="factura">

          ${factura.innerHTML}

        </div>

      </body>

      </html>
    `);

    ventana.document.close();

    ventana.focus();

    setTimeout(() => {

      ventana.print();

      ventana.close();

    }, 500);

  }

}