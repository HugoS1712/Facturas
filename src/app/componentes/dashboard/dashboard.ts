import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturaService } from '../../servicios/factura-service';
import { Factura } from '../../clases/factura';

import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  totalFacturado = 0;
  cantidadFacturas = 0;

  promedioFacturado = 0;
  mayorFactura = 0;
  facturasMes = 0;

  totalTickets = 0;
  ticketsAbiertos = 0;
  ticketsCerrados = 0;

  nombreUsuario = '';

  ultimasFacturas: Factura[] = [];

  constructor(
    private facturaService: FacturaService
  ) { }

  ngOnInit(): void {

    this.nombreUsuario =
      localStorage.getItem(
        'nombreUsuario'
      ) || 'Usuario';

    const tickets =
      JSON.parse(
        localStorage.getItem('tickets') || '[]'
      );

    this.totalTickets =
      tickets.length;

    this.ticketsAbiertos =
      tickets.filter(
        (t: any) =>
          t.estado === 'abierto'
      ).length;

    this.ticketsCerrados =
      tickets.filter(
        (t: any) =>
          t.estado === 'cerrado'
      ).length;

    this.facturaService
      .retornarFactura()
      .subscribe((facturas: Factura[]) => {

        this.cantidadFacturas =
          facturas.length;

        this.totalFacturado =
          facturas.reduce(
            (total, factura) =>
              total +
              Number(
                factura.total || 0
              ),
            0
          );

        this.promedioFacturado =
          this.cantidadFacturas > 0
            ? this.totalFacturado /
              this.cantidadFacturas
            : 0;

        this.mayorFactura =
          facturas.length > 0
            ? Math.max(
                ...facturas.map(
                  f =>
                    Number(
                      f.total || 0
                    )
                )
              )
            : 0;

        const hoy = new Date();

        this.facturasMes =
          facturas.filter(f => {

            const fecha =
              new Date(f.fecha);

            return (
              fecha.getMonth() ===
                hoy.getMonth() &&
              fecha.getFullYear() ===
                hoy.getFullYear()
            );

          }).length;

        this.ultimasFacturas =
          [...facturas]
            .sort(
              (a, b) =>
                new Date(
                  b.fecha
                ).getTime() -
                new Date(
                  a.fecha
                ).getTime()
            )
            .slice(0, 5);

        this.crearGrafico(
          facturas
        );

      });

  }

  crearGrafico(
    facturas: Factura[]
  ): void {

    const ventasPorCliente: any = {};

    facturas.forEach(
      factura => {

        const cliente =
          factura.receptor ||
          'Sin nombre';

        ventasPorCliente[
          cliente
        ] =
          (
            ventasPorCliente[
              cliente
            ] || 0
          ) +
          Number(
            factura.total || 0
          );

      }
    );

    const labels =
      Object.keys(
        ventasPorCliente
      );

    const datos =
      Object.values(
        ventasPorCliente
      );

    const existente =
      Chart.getChart(
        'graficoVentas'
      );

    if (existente) {
      existente.destroy();
    }

    new Chart(
      'graficoVentas',
      {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label:
                'Ventas por Cliente',
              data: datos,
              borderWidth: 1,
              backgroundColor:
                '#2563eb'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    );

  }

}