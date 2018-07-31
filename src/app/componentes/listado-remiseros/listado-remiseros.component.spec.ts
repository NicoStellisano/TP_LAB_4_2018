import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoRemiserosComponent } from './listado-remiseros.component';

describe('ListadoRemiserosComponent', () => {
  let component: ListadoRemiserosComponent;
  let fixture: ComponentFixture<ListadoRemiserosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoRemiserosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoRemiserosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
