import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesComponent } from './countries.component';
import { CountriesService } from './countries.service';
import { CityService } from '../city.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

jest.mock('./countries.service');

describe('CountriesComponent', () => {
  let component: CountriesComponent;
  let fixture: ComponentFixture<CountriesComponent>;

  let countriesService: CountriesService;
  let cityService: CityService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountriesComponent ],
      providers: [CountriesService, CityService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    countriesService = TestBed.get(CountriesService);
    cityService = TestBed.get(CityService);

    fixture = TestBed.createComponent(CountriesComponent);
    component = fixture.componentInstance;

    spyOn(countriesService, 'getCountries').and.returnValue(of([
      { country: 'Spain', city: 'Madrid' },
      { country: 'France', city: 'Paris'}
    ]));

    spyOn(cityService, 'emitCity');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should render component', () => {
    expect(fixture).toMatchSnapshot();
  });
  
  it('should show a list of elements', () => {
    const firstElement = fixture.debugElement.query(By.css('li:first-child'));
    firstElement.nativeElement.click();
    expect(cityService.emitCity).toHaveBeenCalledWith('Madrid');
  });
});
