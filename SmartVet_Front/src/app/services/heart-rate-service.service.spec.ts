import { TestBed } from '@angular/core/testing';

import { HeartRateService } from './heart-rate-service.service';

describe('HeartRateServiceService', () => {
  let service: HeartRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeartRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
