import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from '../shared.service';
import { CountriesService } from './countries.service';
import { Country } from './country';

@Component({
  selector: 'myapp-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries$!: Observable<Country[]>;

  constructor(
    private countriesService: CountriesService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.countries$ = this.countriesService.getCountries();
  }

  sendCity(city: string) {
    this.sharedService.sendCity(city);
  }
}
