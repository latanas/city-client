import { TestBed } from '@angular/core/testing';

import { BuildingTypeFactoryService } from '../../service/building-type-factory.service';

describe('BuildingTypeFactoryService', () => {
  let service: BuildingTypeFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildingTypeFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
