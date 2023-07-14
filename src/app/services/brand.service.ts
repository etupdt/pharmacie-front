import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor() { }

  getBrands(): Observable<any> {

    return of(this.mockBrands)

  }

  mockBrands: {}[] = [
    {
      'id': 0,
      'brandName': 'LA ROCHE ROSAY',
      'imagePath': ''
    },
    {
      'id': 1,
      'brandName': 'ZZZQUIL',
      'imagePath': ''
    },
    {
      'id': 2,
      'brandName': 'CERAVE',
      'imagePath': ''
    },
    {
      'id': 3,
      'brandName': 'ISDIN',
      'imagePath': ''
    },
    {
      'id': 4,
      'brandName': 'VICHY',
      'imagePath': ''
    },
  ]

}
