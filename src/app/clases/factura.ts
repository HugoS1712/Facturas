import { Detallefactura } from "./detallefactura";

export class Factura {

    public fecha: Date;
    public tipo: TipoFactura;
    public numero: number;

    public iva: number = 0;
    public total: number = 0;
    public neto: number = 0;

    public receptor: string;

    // 🔥 USAR SOLO UNO
    public detalles: Detallefactura[] = [];

    constructor(fecha: Date, numero: number, tipo: TipoFactura, receptor: string) {
        this.fecha = fecha;
        this.numero = numero;
        this.tipo = tipo;
        this.receptor = receptor;
        this.neto = 0;
    }

    calcularTotales() {

        this.neto = this.detalles.reduce(
            (acum, item) => acum + (item.cantidad * item.precioUnitario), 0
        );

        this.iva = this.neto * 0.21;
        this.total = this.neto + this.iva;
    }
}

export enum TipoFactura {
    A = 'A',
    B = 'B',
    C = 'C'
}