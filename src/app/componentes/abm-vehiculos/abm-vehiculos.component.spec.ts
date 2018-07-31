import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmVehiculosComponent } from './abm-vehiculos.component';

describe('AbmVehiculosComponent', () => {
  let component: AbmVehiculosComponent;
  let fixture: ComponentFixture<AbmVehiculosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmVehiculosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
