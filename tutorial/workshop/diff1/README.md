# Diff 1: Basic Structure of Application

1) Generate components with Angular CLI:

```
ng generate component countries
```

```
ng generate component city
```

2) Delete all content inside ``app.component.css``.

3) Add components to ``app.component.html``:

<pre><b>app.component.html</b></pre>

```html
<myapp-countries></myapp-countries>
<myapp-city></myapp-city>
```

<br/>

4) Generate services with Angular CLI:

```
ng generate service countries/countries
```

```
ng generate service shared
```

5) Inject services in ``countries.component.ts``:

<pre><b>countries.component.ts</b></pre>

```typescript
import { Component, OnInit } from '@angular/core';
import { CountriesService } from './countries.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'myapp-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  constructor(private countriesService: CountriesService, private sharedService: SharedService) { }

  ngOnInit() {
  }
}
```

<br/>

6) Inject service in ``city.component.ts``:

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
}
```

Continue to [Diff 2: Show List of Countries](../diff2)
