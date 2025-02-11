import { TestBed } from '@angular/core/testing';

import { RecordTitleService } from './record-title.service';

describe('RecordTitleService', () => {
  let service: RecordTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
