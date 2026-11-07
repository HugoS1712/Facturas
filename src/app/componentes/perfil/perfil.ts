import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.scss']
})
export class Perfil implements OnInit {

  nombre = '';
  email = '';
  rol = '';
  foto = '';

  ngOnInit(): void {

    this.nombre =
      localStorage.getItem('nombreUsuario') || '';

    this.email =
      localStorage.getItem('usuario') || '';

    this.rol =
      localStorage.getItem('rol') || 'Usuario';

    this.foto =
      localStorage.getItem('fotoUsuario') || '';

  }

}