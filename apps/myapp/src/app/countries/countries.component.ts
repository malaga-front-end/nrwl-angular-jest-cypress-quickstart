import { Component, OnInit } from '@angular/core';
import { CountriesService } from './countries.service';
import { Observable } from 'rxjs';
import { Country } from './country';

@Component({
  selector: 'myapp-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries$: Observable<Country[]>;

  constructor(private countriesService: CountriesService) { }

  ngOnInit() {
    this.countries$ = this.countriesService.getCountries();
  }

}
