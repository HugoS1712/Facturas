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
  filtroPeriodo = '';
  filtroImporte = '';

  constructor(
    public servicio: FacturaService
  ) {

    this.servicio
      .retornarFactura()
      .subscribe((data: Factura[]) => {

        const ordenadas = [...data].sort(
          (a: any, b: any) =>
            new Date(b.fecha).getTime() -
            new Date(a.fecha).getTime()
        );

        this.factura = ordenadas;
        this.facturaOriginal = ordenadas;

      });

  }

  mostrarTodas(): void {

    this.factura = [
      ...this.facturaOriginal
    ];

    this.textoBusqueda = '';
    this.filtroPeriodo = '';
    this.filtroImporte = '';

  }

  buscarCliente(): void {

    const texto =
      this.textoBusqueda
        .trim()
        .toLowerCase();

    this.factura =
      this.facturaOriginal.filter(
        (f: any) =>
          f.receptor
            ?.toLowerCase()
            .includes(texto)
      );

  }

  filtrarPeriodo(): void {

    if (!this.filtroPeriodo) {
      this.mostrarTodas();
      return;
    }

    const hoy = new Date();

    this.factura =
      this.facturaOriginal.filter(
        (f: any) => {

          const fecha =
            new Date(f.fecha);

          switch (this.filtroPeriodo) {

            case 'dia':

              return (
                fecha.toDateString() ===
                hoy.toDateString()
              );

            case 'semana': {

              const hace7Dias =
                new Date();

              hace7Dias.setDate(
                hoy.getDate() - 7
              );

              return fecha >= hace7Dias;

            }

            case 'mes':

              return (
                fecha.getMonth() ===
                  hoy.getMonth() &&
                fecha.getFullYear() ===
                  hoy.getFullYear()
              );

            case 'anio':

              return (
                fecha.getFullYear() ===
                hoy.getFullYear()
              );

            default:
              return true;

          }

        }
      );

  }

  filtrarImporte(): void {

    switch (this.filtroImporte) {

      case 'menor5000':

        this.factura =
          this.facturaOriginal.filter(
            (f: any) => f.total < 5000
          );

        break;

      case '5000-10000':

        this.factura =
          this.facturaOriginal.filter(
            (f: any) =>
              f.total >= 5000 &&
              f.total <= 10000
          );

        break;

      case '10000-50000':

        this.factura =
          this.facturaOriginal.filter(
            (f: any) =>
              f.total > 10000 &&
              f.total <= 50000
          );

        break;

      case 'mayor50000':

        this.factura =
          this.facturaOriginal.filter(
            (f: any) => f.total > 50000
          );

        break;

      default:

        this.mostrarTodas();

    }

  }

  get totalFacturado(): number {

    return this.factura.reduce(
      (total: number, factura: any) =>
        total + factura.total,
      0
    );

  }

  get promedioFacturado(): number {

    if (this.factura.length === 0) {
      return 0;
    }

    return (
      this.totalFacturado /
      this.factura.length
    );

  }

  get mayorFactura(): number {

    if (this.factura.length === 0) {
      return 0;
    }

    return Math.max(
      ...this.factura.map(
        (f: any) => f.total
      )
    );

  }

  editarFactura(
    factura: Factura
  ): void {

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