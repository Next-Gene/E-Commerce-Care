import { TestBed } from '@angular/core/testing';

import { DeliverypaymentService } from './deliverypayment.service';

describe('DeliverypaymentService', () => {
  let service: DeliverypaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliverypaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
