# Diff 2: Show List of Countries

1) Add ``HttpClientModule`` to ``app.module.ts``:

<pre><b>app.module.ts</b></pre>

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CountriesComponent } from './countries/countries.component';
import { HttpClientModule } from '@angular/common/http';
import { CityComponent } from './city/city.component';

@NgModule({
  declarations: [AppComponent, CountriesComponent, CityComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

2) Create an interface for the country:

<pre><b>country.ts</b></pre>

```typescript
export interface Country {
  name: string;
  capital: string;
}
```

3) Create a method ``getCountries`` to do the GET request:

<pre><b>countries.service.ts</b></pre>

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from './country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private readonly url = 'http://192.168.144.220:3000/countries';

  constructor(private httpClient: HttpClient) { }

  public getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(this.url);
  }
}
```

4) Call ``getCountries()`` on component initialization and save the result in ``countries$``:

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
}
```

5) Do a ``*ngFor`` loop and subscribe with pipe ``async`` to print the results.

<pre><b>countries.component.html</b></pre>

```html
<ul>
  <li *ngFor="let country of countries$ | async">{{ country.name }}</li>
</ul>
```

6) Copy the CSS styles to ``countries.component.css`` to beautify the list:

<pre><b>countries.component.css</b></pre>

```css
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  cursor: pointer;
  font: 200 20px/1.5 Helvetica, Verdana, sans-serif;
  border-bottom: 1px solid #ccc;
  text-decoration: none;
  color: #000;
  display: block;
  width: 300px;

  -webkit-transition: font-size 0.3s ease, background-color 0.3s ease;
  -moz-transition: font-size 0.3s ease, background-color 0.3s ease;
  -o-transition: font-size 0.3s ease, background-color 0.3s ease;
  -ms-transition: font-size 0.3s ease, background-color 0.3s ease;
  transition: font-size 0.3s ease, background-color 0.3s ease;
}

li:hover {
  font-size: 30px;
  background: #f6f6f6;
}
```

Continue to [Diff 3: App Completed](../diff3)
