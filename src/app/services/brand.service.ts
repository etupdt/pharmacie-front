import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor() { }

  mockBrands: string = `[
    {
      'id': 0,
      'brandName': 'LA ROCHE ROSAY',
      'imagePath': ''
    },
    {
      'id': 1,
      'brandName': 'OXYFORM',
      'imagePath': ''
    },
    {
      'id': 2,
      'brandName': 'OENOBIOL',
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
  ]`

}
