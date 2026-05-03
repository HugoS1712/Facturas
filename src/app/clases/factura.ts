import { Detallefactura } from "./detallefactura";

export class Factura {


    public fecha: Date;
    public tipo: TipoFactura;
    public numero: number;
    public iva: number = 0;
    public total: number = 0;
    public neto: number = 0;
    public receptor: string;
    public detalles: Detallefactura[] = [];
    public items: Array<Detallefactura> = [];



    constructor(fecha: Date, numero: number, tipo: TipoFactura, receptor: string) {
        this.fecha = fecha;
        this.numero = numero;
        this.tipo = tipo;
        this.receptor = receptor;
        this.items = new Array<Detallefactura>();
    }
    calcularTotales() {

        this.neto = this.items.reduce((acum, item) => { return acum + (item.cantidad * item.precioUnitario); }, 0);

        this.iva = this.neto * 0.21;
        this.total = this.neto + this.iva;
    }


}



export enum TipoFactura {
    A = 'A',
    B = 'B',
    C = 'C'
}   