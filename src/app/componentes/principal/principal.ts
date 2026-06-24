import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './principal.html',
  styleUrls: ['./principal.scss'],
})
export class Principal implements OnInit {

  hoy = new Date();
  colorFondo: string = '';

  ngOnInit() {

    const dia = new Date().getDay();

    const colores = [
      'linear-gradient(135deg, #1e3a8a, #38bdf8)', // domingo
      'linear-gradient(135deg, #0f172a, #1e293b)', // lunes
      'linear-gradient(135deg, #1d4ed8, #9333ea)', // martes
      'linear-gradient(135deg, #047857, #22c55e)', // miércoles
      'linear-gradient(135deg, #b45309, #f59e0b)', // jueves
      'linear-gradient(135deg, #7c3aed, #ec4899)', // viernes
      'linear-gradient(135deg, #be123c, #fb7185)'  // sábado
    ];

    this.colorFondo = colores[dia];
  }
}