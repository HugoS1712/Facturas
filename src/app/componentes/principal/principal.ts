import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-principal',
  standalone: true,              // 👈 necesario
  imports: [CommonModule],
  templateUrl: './principal.html',
  styleUrl: './principal.scss',
})
export class Principal {
  hoy = new Date();              // 👈 ahora sí dentro de la clase
}

