import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroFactura',
})
export class FiltroFacturaPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
