export class Factura {

    calcularTotales() {
        this.iva = this.neto * 0.21;
        this.total = this.neto + this.iva;
    }

    public fecha: Date;
    public tipo: TipoFactura;
    public numero: number;
    public iva: number = 0;
    public total: number = 0;
    public neto: number = 0;
    public receptor: string;

    public detalles: any[] = [];

    constructor(fecha: Date, numero: number, tipo: TipoFactura, receptor: string) {
        this.fecha = fecha;
        this.numero = numero;
        this.tipo = tipo;
        this.receptor = receptor;
    }

}



export enum TipoFactura {
    A = 'A',
    B = 'B',
    C = 'C'
}   