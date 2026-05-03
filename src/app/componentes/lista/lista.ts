import { Component } from '@angular/core';
import { Factura, TipoFactura } from '../../clases/factura';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Detallefactura } from '../../clases/detallefactura';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista.html',
  styleUrl: './lista.scss',
})
export class Lista {

  public facturas: Factura[] = [];
  public tipo: string = 'text';
  public EtipoFactura = TipoFactura;
  public claseFactura: string = 'contenedor';

  constructor() {
    this.facturas.push(
      new Factura(new Date(), 1, TipoFactura.A, "Cliente A")
    );
  }

  mostrarLetra(valor: TipoFactura): string {
    return valor == TipoFactura.A ? 'A' :
      valor == TipoFactura.B ? 'B' : 'C';
  }

  mostrarFecha() {
    this.facturas[0].fecha.setDate(
      this.facturas[0].fecha.getDate() + 1
    );
    alert(this.facturas[0].fecha);
  }

  agregarDetalle() {

    // 🔥 crear detalle correctamente (INSTANCIA)
    const nuevoDetalle = new Detallefactura();
    nuevoDetalle.cantidad = 1;
    nuevoDetalle.descripcion = 'Producto 1';
    nuevoDetalle.precioUnitario = 2500;

    // 🔥 agregar a la factura
    this.facturas[0].detalles.push(nuevoDetalle);

    // 🔥 recalcular neto
    this.facturas[0].neto = this.facturas[0].detalles
      .reduce((acc, d) => acc + d.cantidad * d.precioUnitario, 0);

    // 🔥 recalcular IVA y total
    this.facturas[0].calcularTotales();
  }

  guardar() {
    console.info(this.facturas);
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