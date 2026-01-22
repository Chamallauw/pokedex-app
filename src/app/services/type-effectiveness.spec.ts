import { TestBed } from '@angular/core/testing';

import { TypeEffectiveness } from './type-effectiveness';

describe('TypeEffectiveness', () => {
  let service: TypeEffectiveness;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeEffectiveness);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
