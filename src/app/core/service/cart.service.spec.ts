import { TestBed } from '@angular/core/testing';

import { CartServive } from './cart.service';

describe('CartServive', () => {
  let service: CartServive;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartServive);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
