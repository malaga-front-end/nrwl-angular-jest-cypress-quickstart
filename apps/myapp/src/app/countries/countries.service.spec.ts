import { TestBed } from '@angular/core/testing';

import { CountriesService } from './countries.service';
import { HttpClient } from '@angular/common/http';

jest.mock('@angular/common/http');

describe('CountriesService', () => {
  let httpClient: HttpClient;
  let countriesService: CountriesService;

  beforeEach(() => {
    httpClient = new HttpClient({} as any);
    countriesService = new CountriesService(httpClient);

    jest.spyOn(httpClient, 'get');
  });

  it('should be created', () => {
    expect(countriesService).toBeTruthy();
  });

  it('should retrieve a list of countries with its capitals', () => {
    countriesService.getCountries();

    expect(httpClient.get).toHaveBeenCalledWith('http://localhost:3000/countries');
  });
});
