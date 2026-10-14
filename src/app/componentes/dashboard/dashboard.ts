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

  constructor(
    private facturaService: FacturaService
  ) { }

  ngOnInit(): void {

    this.facturaService
      .retornarFactura()
      .subscribe((facturas: Factura[]) => {

        this.cantidadFacturas =
          facturas.length;

        this.totalFacturado =
          facturas.reduce(
            (total, factura) =>
              total + Number(factura.total || 0),
            0
          );

        this.crearGrafico(facturas);

      });

  }

  crearGrafico(
    facturas: Factura[]
  ): void {

    const ventasPorCliente: any = {};

    facturas.forEach(factura => {

      const cliente =
        factura.receptor || 'Sin nombre';

      ventasPorCliente[cliente] =
        (ventasPorCliente[cliente] || 0)
        + Number(factura.total || 0);

    });

    const labels =
      Object.keys(ventasPorCliente);

    const datos =
      Object.values(ventasPorCliente);

    new Chart(
      'graficoVentas',
      {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Ventas por Cliente',
              data: datos,
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true
        }
      }
    );

  }

}