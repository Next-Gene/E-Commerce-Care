import { TestBed } from '@angular/core/testing';

import { WishlistServive } from './wishlist.service';

describe('WishlistService', () => {
  let service: WishlistServive;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishlistServive);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
