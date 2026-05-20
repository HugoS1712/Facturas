import { Injectable } from '@angular/core';
import { Factura } from '../clases/factura';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  static facturas: any;
  static obtenerProximoNumero(): number {
    this.retornarFactura();

    return this.facturas.length + 1;
  }
  static retornarFactura() {
    throw new Error('Method not implemented.');
  }

  private facturas: Array<Factura> = [];

  public obtenerFactura(numero: number): Factura | undefined {
    return this.facturas.find(f => f.numero === numero);
  }
  public agregarFactura(factura: Factura) {
    this.facturas.push(factura);
    this.persistirFacturas();
  }
  public modificarFactura(factura: Factura) {
    const index = this.facturas.findIndex(f => f.numero === factura.numero);
    if (index !== -1) {
      this.facturas[index] = factura;
    }
    this.persistirFacturas();
  }
  public retornarFactura(): Array<Factura> {
    const facturasGuardadas = localStorage.getItem('factura');
    if (facturasGuardadas) {
      this.facturas = (JSON.parse(facturasGuardadas));
    }
    else
      this.facturas = [];
    return this.facturas
  }
  private persistirFacturas() {
    localStorage.setItem('factura', JSON.stringify(this.facturas));
  }
}
