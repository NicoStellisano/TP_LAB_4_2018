import { RuteoModule } from './ruteo.module';

describe('RuteoModule', () => {
  let ruteoModule: RuteoModule;

  beforeEach(() => {
    ruteoModule = new RuteoModule();
  });

  it('should create an instance', () => {
    expect(ruteoModule).toBeTruthy();
  });
});
