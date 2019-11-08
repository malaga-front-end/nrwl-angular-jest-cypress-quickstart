# Diff 1: Components & Services Created

Delete all content inside ``app.component.css``.

<pre><b>app.component.spec.ts</b></pre>

```typescript
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
```

<br/>

<pre><b>app.component.html</b></pre>

```html
<myapp-countries></myapp-countries>
<myapp-city></myapp-city>
```

<br/>

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
