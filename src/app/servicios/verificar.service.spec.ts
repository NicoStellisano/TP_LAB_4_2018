import { TestBed, inject } from '@angular/core/testing';

import { VerificarService } from './verificar.service';

describe('VerificarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerificarService]
    });
  });

  it('should be created', inject([VerificarService], (service: VerificarService) => {
    expect(service).toBeTruthy();
  }));
});
