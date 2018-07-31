import { TestBed, inject } from '@angular/core/testing';

import { VehiculosService } from './vehiculos.service';

describe('VehiculosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehiculosService]
    });
  });

  it('should be created', inject([VehiculosService], (service: VehiculosService) => {
    expect(service).toBeTruthy();
  }));
});
