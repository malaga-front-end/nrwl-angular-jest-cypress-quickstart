# Diff 4: Unit & Snapshot Tests with Jest

<pre><b>countries.service.spec.ts</b></pre>

```typescript
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

  it('should call httpClient.get with the expected url', () => {
    countriesService.getCountries();

    expect(httpClient.get).toHaveBeenCalledWith('http://10.150.145.134:3000/countries');
  });
});
```

<br/>

<pre><b>countries.component.spec.ts</b></pre>

```typescript
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesComponent } from './countries.component';
import { CountriesService } from './countries.service';
import { SharedService } from '../shared.service';
import { of } from 'rxjs/internal/observable/of';
import { By } from '@angular/platform-browser';

jest.mock('./countries.service');
jest.mock('../shared.service');

describe('CountriesComponent', () => {
  let component: CountriesComponent;
  let fixture: ComponentFixture<CountriesComponent>;
  let countriesService: CountriesService;
  let sharedService: SharedService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountriesComponent ],
      providers: [ CountriesService, SharedService ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    countriesService = TestBed.get(CountriesService);
    sharedService = TestBed.get(SharedService);

    jest.spyOn(countriesService, 'getCountries').mockReturnValue(of([
      { name: 'Spain', capital: 'Madrid' },
      { name: 'France', capital: 'Paris'}
    ]));

    jest.spyOn(sharedService, 'sendCity');

    fixture = TestBed.createComponent(CountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call CountriesService.getCountries()', () => {
    expect(countriesService.getCountries).toHaveBeenCalled();
  });

  it('should send capital city after clicking on a country', () => {
    const firstElement = fixture.debugElement.queryAll(By.css('li'))[0].nativeElement;
    firstElement.click();
    expect(sharedService.sendCity).toHaveBeenCalledWith('Madrid');
  });

  it('should render a list of countries', () => {
    expect(fixture).toMatchSnapshot();
  });
});
```

Continue to [Diff 5: E2E Tests with Cypress](../diff5)
