import { Factura, TipoFactura } from './factura';

describe('Factura', () => {
  it('should create an instance', () => {
    expect(new Factura(new Date(), 1, TipoFactura.A, 'Cliente A')).toBeTruthy();
  });
});

