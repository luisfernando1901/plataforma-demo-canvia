import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoformularioComponent } from './nuevoformulario.component';

describe('NuevoformularioComponent', () => {
  let component: NuevoformularioComponent;
  let fixture: ComponentFixture<NuevoformularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoformularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoformularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
