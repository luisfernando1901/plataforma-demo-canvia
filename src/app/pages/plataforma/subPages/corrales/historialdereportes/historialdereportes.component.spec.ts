import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialdereportesComponent } from './historialdereportes.component';

describe('HistorialdereportesComponent', () => {
  let component: HistorialdereportesComponent;
  let fixture: ComponentFixture<HistorialdereportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialdereportesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialdereportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
