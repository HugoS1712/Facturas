import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Principal } from "./componentes/principal/principal";
import { Error } from "./componentes/error/error";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Principal, Error],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('facturacion');
}
