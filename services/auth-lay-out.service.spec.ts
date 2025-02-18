import { TestBed } from '@angular/core/testing';

import { AuthLayOutService } from './auth-lay-out.service';

describe('AuthLayOutService', () => {
  let service: AuthLayOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthLayOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
