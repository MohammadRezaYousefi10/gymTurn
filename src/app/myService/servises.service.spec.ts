import { TestBed } from '@angular/core/testing';

import { ServisesService } from './servises.service';

describe('ServisesService', () => {
  let service: ServisesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServisesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
