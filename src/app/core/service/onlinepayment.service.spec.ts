import { TestBed } from '@angular/core/testing';

import { OnlinepaymentService } from './onlinepayment.service';

describe('OnlinepaymentService', () => {
  let service: OnlinepaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlinepaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
