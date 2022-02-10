import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private subject: Subject<string> = new Subject<string>();
  private city$: Observable<string> = this.subject.asObservable();
    
  sendCity(city: string) {
    this.subject.next(city);
  }

  getCity() {
    return this.city$;
  }
}
