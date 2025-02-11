import { TestBed } from '@angular/core/testing';

import { RecordStrategyFactoryService } from './record-strategy-factory.service';

describe('RecordStrategyFactoryService', () => {
  let service: RecordStrategyFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordStrategyFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
