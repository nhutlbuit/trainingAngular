import { TestBed, async, inject } from '@angular/core/testing';

import { Test1Guard } from './test1.guard';

describe('Test1Guard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Test1Guard]
    });
  });

  it('should ...', inject([Test1Guard], (guard: Test1Guard) => {
    expect(guard).toBeTruthy();
  }));
});
