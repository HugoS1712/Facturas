import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-resumen-dashboard',
  standalone: true,
  template: `
    <h2>Total Facturado: {{ total }}</h2>
  `
})
export class ResumenDashboard {

  @Input()
  total = 0;

}
``