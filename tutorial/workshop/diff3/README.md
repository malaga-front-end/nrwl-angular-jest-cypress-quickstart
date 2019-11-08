# Diff 3: App Completed

<pre><b>countries.component.ts</b></pre>

```typescript
import { Component, OnInit } from '@angular/core';
import { CountriesService } from './countries.service';
import { Observable } from 'rxjs';
import { Country } from './country';
import { SharedService } from '../shared.service';

@Component({
  selector: 'myapp-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries$: Observable<Country[]>;

  constructor(private countriesService: CountriesService, private sharedService: SharedService) { }

  ngOnInit() {
    this.countries$ = this.countriesService.getCountries();
  }

  sendCity(city: string) {
    this.sharedService.sendCity(city);
  }
}
```

<br/>

<pre><b>countries.component.html</b></pre>

```html
<ul>
  <li *ngFor="let country of countries$ | async" (click)="sendCity(country.capital)">{{ country.name }}</li>
</ul>
```

<br/>

<pre><b>city.component.css</b></pre>

```css
h1 {
  font: 300 40px Helvetica, Verdana, sans-serif;
  position: fixed;
  top: 20px;
  right: 0;
  background: hsla(80, 90%, 40%, 0.7);
  border: solid hsla(80, 90%, 40%, 0.5);
  color: white;
  text-align: right;
  border-right: none;
  padding: 0.5em 0.5em 0.5em 1em;
  box-shadow: 0 1px 3px black;
  border-radius: 3em 0 0 3em;
  transition: bottom 0.5s ease-in-out;
  animation-name: snackbar-show;
  animation-duration: 0.5s;
}

@keyframes snackbar-show {
  0%{ right: -200px; }
}
```

<br/>

<pre><b>city.component.ts</b></pre>

```typescript
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'myapp-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
  }

  getCity() {
    return this.sharedService.getCity();
  }
}
```

<br/>

<pre><b>city.component.html</b></pre>

```html
<h1 *ngIf="getCity() | async as city">{{ city }}</h1>
```

Continue to [Diff 4: Unit & Snapshot Tests with Jest](../diff4)
