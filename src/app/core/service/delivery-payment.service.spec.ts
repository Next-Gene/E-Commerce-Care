import { TestBed } from '@angular/core/testing';

import { DeliveryPaymentService } from './delivery-payment.service';

describe('DeliveryPaymentService', () => {
  let service: DeliveryPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
