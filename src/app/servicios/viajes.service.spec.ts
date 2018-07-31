import { TestBed, inject } from '@angular/core/testing';

import { ViajesService } from './viajes.service';

describe('ViajesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViajesService]
    });
  });

  it('should be created', inject([ViajesService], (service: ViajesService) => {
    expect(service).toBeTruthy();
  }));
});
