import { TestBed, inject } from '@angular/core/testing';

import { HomeAwayService } from './home-away.service';

describe('HomeAwayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeAwayService]
    });
  });

  it('should ...', inject([HomeAwayService], (service: HomeAwayService) => {
    expect(service).toBeTruthy();
  }));
});
