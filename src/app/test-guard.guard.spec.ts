import { TestBed, async, inject } from '@angular/core/testing';

import { TestGuardGuard } from './test-guard.guard';

describe('TestGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestGuardGuard]
    });
  });

  it('should ...', inject([TestGuardGuard], (guard: TestGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
