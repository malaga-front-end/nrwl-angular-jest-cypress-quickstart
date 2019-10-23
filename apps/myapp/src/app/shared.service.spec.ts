import { SharedService } from './shared.service';
import { fakeAsync } from '@angular/core/testing';

describe('SharedService', () => {
  let sharedService: SharedService;
  beforeEach(() => {
    sharedService = new SharedService();
  });

  it('should send a city', fakeAsync(() => {
    sharedService.getCity().subscribe((city) => {
      expect(city).toBe('Madrid');
    });

    sharedService.sendCity('Madrid');
  }));
});
