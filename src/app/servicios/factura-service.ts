import { Injectable } from '@angular/core';
import { Factura, TipoFactura } from '../clases/factura';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {

  private facturas: Array<Factura> = [];

  // ✅ PRÓXIMO NÚMERO POR TIPO (ENUM CORRECTO)
  obtenerProximoNumero(tipo: TipoFactura): Observable<number> {
    return this.retornarFactura().pipe(
      map(facturas => {

        // ✅ filtra correctamente por enum
        const filtradas = facturas.filter(f => f.tipo === tipo);

        // ✅ obtiene el último número usado en ese tipo
        return filtradas.length > 0
          ? Math.max(...filtradas.map(f => f.numero)) + 1
          : 1;
      })
    );
  }

  // 👉 TRAER UNA FACTURA
  public obtenerFactura(numero: number): Observable<Factura | undefined> {
    return new Observable(obs => {
      this.retornarFactura().subscribe(() => {
        const factura = this.facturas.find(f => f.numero === numero);
        obs.next(factura);
        obs.complete();
      });
    });
  }

  // 👉 AGREGAR FACTURA
  public agregarFactura(factura: Factura) {
    this.facturas.push(factura);
    this.persistirFacturas();
  }

  // 👉 MODIFICAR FACTURA
  public modificarFactura(factura: Factura) {
    const index = this.facturas.findIndex(f => f.numero === factura.numero);
    if (index !== -1) {
      this.facturas[index] = factura;
      this.persistirFacturas();
    }
  }

  // 👉 LEER LOCALSTORAGE
  public retornarFactura(): Observable<Factura[]> {
    return new Observable(obs => {
      const data = localStorage.getItem('factura');

      this.facturas = data ? JSON.parse(data) : [];

      obs.next(this.facturas);
      obs.complete();
    });
  }

  // 👉 GUARDAR
  private persistirFacturas() {
    localStorage.setItem('factura', JSON.stringify(this.facturas));
  }
}