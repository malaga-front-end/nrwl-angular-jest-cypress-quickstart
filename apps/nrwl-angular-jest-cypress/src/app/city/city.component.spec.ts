import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityComponent } from './city.component';
import { CityService } from '../city.service';
import { of } from 'rxjs';

jest.mock('../city.service');

describe('CityComponent', () => {
  let component: CityComponent;
  let fixture: ComponentFixture<CityComponent>;

  let cityService: CityService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityComponent ],
      providers: [ CityService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    cityService = TestBed.get(CityService);

    fixture = TestBed.createComponent(CityComponent);
    component = fixture.componentInstance;

    jest.spyOn(cityService, 'getCity').mockReturnValue(of('Madrid'));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render component properly', () => {
    expect(fixture).toMatchSnapshot();
  });
});
