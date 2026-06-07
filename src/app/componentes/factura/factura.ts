import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Factura, TipoFactura } from '../../clases/factura';
import { Detallefactura } from '../../clases/detallefactura';
import { RouterModule } from '@angular/router';
import { FacturaService } from '../../servicios/factura-service';

@Component({
  selector: 'app-factura',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './factura.html',
  styleUrl: './factura.scss',
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

    // ✅ ahora pasamos el tipo correctamente
    const tipoInicial = TipoFactura.A;

    this.servicio.obtenerProximoNumero(tipoInicial)
      .subscribe((numero: number) => {

        const nuevaFactura = new Factura(
          new Date(),
          numero,
          tipoInicial,
          "Cliente A"
        );

        this.facturas.push(nuevaFactura);
      });
  }

  mostrarLetra(valor: TipoFactura): string {
    return valor === TipoFactura.A ? 'A' :
      valor === TipoFactura.B ? 'B' : 'C';
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

    this.facturas[0].detalles.push(nuevoDetalle);

    // ✅ recalcula
    this.facturas[0].calcularTotales();
  }

  guardar() {
    console.log(this.facturas[0]);
    this.servicio.agregarFactura(this.facturas[0]);
  }

  cambiarFondo() {
    this.claseFactura =
      this.facturas[0].tipo === this.EtipoFactura.A ? 'cuerpo-contraste' :
        this.facturas[0].tipo === this.EtipoFactura.B ? 'cuerpo-pastel' :
          'contenedor';
  }

  imprimir() {
    window.print();
  }
}