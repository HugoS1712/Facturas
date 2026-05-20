import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaComponent } from './factura';
import { Factura } from '../../clases/factura';

describe('Factura', () => {
  let component: Factura;
  let fixture: ComponentFixture<Factura>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Factura],
    }).compileComponents();

    fixture = TestBed.createComponent(Factura);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
