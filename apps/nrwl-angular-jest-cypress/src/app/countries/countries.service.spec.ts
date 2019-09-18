import { TestBed } from '@angular/core/testing';

import { CountriesService } from './countries.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('CountriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: CountriesService = TestBed.get(CountriesService);
    expect(service).toBeTruthy();
  });
});

