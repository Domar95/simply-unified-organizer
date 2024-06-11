import { TestBed } from '@angular/core/testing';

import { RecordsApiService } from './records-api.service';

describe('RecordsApiService', () => {
  let service: RecordsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
