import { TestBed } from '@angular/core/testing';

import { FabcarService } from './fabcar.service';

describe('FabcarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FabcarService = TestBed.get(FabcarService);
    expect(service).toBeTruthy();
  });
});
