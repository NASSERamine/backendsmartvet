import { TestBed } from '@angular/core/testing';

import { AnimalSelectionServiceService } from './animal-selection-service.service';

describe('AnimalSelectionServiceService', () => {
  let service: AnimalSelectionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalSelectionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
