import { Component, OnInit } from '@angular/core';
import { CountriesService } from './countries.service';
import { CityService } from '../city.service';

@Component({
  selector: 'nrwl-angular-jest-cypress-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries$: any;

  constructor(private countriesService: CountriesService, private cityService: CityService) { }

  ngOnInit() {
    this.countries$ = this.countriesService.getCountries();
  }

  selectCountry(city: string) {
    this.cityService.city.emit(city);
  }
}
