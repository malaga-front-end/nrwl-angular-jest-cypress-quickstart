import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
   // Observable string sources
   private citySource = new Subject<string>();
 
   // Observable string streams
   city$ = this.citySource.asObservable();
 
   // Service message commands
   emitCity(city: string) {
     this.citySource.next(city);
   }

   getCity() {
     return this.city$;
   }
}
