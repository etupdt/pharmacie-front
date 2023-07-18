import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnSiteServiceService {

  constructor() { }

  getOnSiteServices(): Observable<any> {

    return of(this.mockOnSiteServices)

  }

  mockOnSiteServices: any[] = [
    {
      'id': 0,
      'onSiteServiceName': 'Soins du visage',
      'description': '',
      'price': 18.21,
      'duree': 3,
    },
  ]

}
