import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorViajesComponent } from './gestor-viajes.component';

describe('GestorViajesComponent', () => {
  let component: GestorViajesComponent;
  let fixture: ComponentFixture<GestorViajesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestorViajesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorViajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
