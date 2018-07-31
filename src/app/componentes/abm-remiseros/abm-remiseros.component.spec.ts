import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmRemiserosComponent } from './abm-remiseros.component';

describe('AbmRemiserosComponent', () => {
  let component: AbmRemiserosComponent;
  let fixture: ComponentFixture<AbmRemiserosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmRemiserosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmRemiserosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
