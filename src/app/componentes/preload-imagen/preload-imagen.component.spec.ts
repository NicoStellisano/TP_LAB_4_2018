import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloadImagenComponent } from './preload-imagen.component';

describe('PreloadImagenComponent', () => {
  let component: PreloadImagenComponent;
  let fixture: ComponentFixture<PreloadImagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreloadImagenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloadImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
