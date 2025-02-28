import { TestBed } from '@angular/core/testing';

import { CatserviceService } from './catservice.service';

describe('CatserviceService', () => {
  let service: CatserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
