import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityComponent } from './city.component';
import { SharedService } from '../shared.service';
import { of } from 'rxjs';

jest.mock('../shared.service');

describe('CityComponent', () => {
  let component: CityComponent;
  let fixture: ComponentFixture<CityComponent>;
  let sharedService: SharedService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityComponent ],
      providers: [ SharedService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    sharedService = TestBed.get(SharedService);
    jest.spyOn(sharedService, 'getCity').mockReturnValue(of('Madrid'));
    fixture = TestBed.createComponent(CityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a city', () => {
    expect(fixture).toMatchSnapshot();
  });
});
