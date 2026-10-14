import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenDashboard } from './resumen-dashboard';

describe('ResumenDashboard', () => {
  let component: ResumenDashboard;
  let fixture: ComponentFixture<ResumenDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumenDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
