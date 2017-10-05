import { TestBed, inject } from '@angular/core/testing';

import { ActivityStoreService } from './activity-store.service';

describe('ActivityServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivityStoreService]
    });
  });

  it('should be created', inject([ActivityStoreService], (service: ActivityStoreService) => {
    expect(service).toBeTruthy();
  }));
});
