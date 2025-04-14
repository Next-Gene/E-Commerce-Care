import { TestBed } from '@angular/core/testing';

import { CartServiveService } from './cart-servive.service';

describe('CartServiveService', () => {
  let service: CartServiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartServiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
