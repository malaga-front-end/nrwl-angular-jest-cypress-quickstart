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
