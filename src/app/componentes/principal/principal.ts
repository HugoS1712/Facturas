import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './principal.html',
  styleUrls: ['./principal.scss'],
})
export class Principal implements OnInit {

  hoy = new Date();

  colorFondo = '';

  logueado = false;

  ngOnInit() {

    if (typeof window !== 'undefined') {

      this.logueado =
        localStorage.getItem('logueado') === 'true';

    }

    const dia = new Date().getDay();

    const colores = [
      'linear-gradient(135deg, #1e3a8a, #38bdf8)',
      'linear-gradient(135deg, #0f172a, #1e293b)',
      'linear-gradient(135deg, #1d4ed8, #9333ea)',
      'linear-gradient(135deg, #047857, #22c55e)',
      'linear-gradient(135deg, #b45309, #f59e0b)',
      'linear-gradient(135deg, #7c3aed, #ec4899)',
      'linear-gradient(135deg, #be123c, #fb7185)'
    ];

    this.colorFondo = colores[dia];

  }

}