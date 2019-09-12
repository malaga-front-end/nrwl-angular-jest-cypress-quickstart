import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private readonly url = 'http://localhost:3000/countries';

  constructor(private httpClient: HttpClient) { }

  public getCountries() {
    return this.httpClient.get(this.url);
  }
}
