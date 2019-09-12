import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  city: EventEmitter<string> = new EventEmitter();
}
