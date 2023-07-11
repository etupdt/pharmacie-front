import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  mockProducts: any[] = [
    {
      'id': 0,
      'productName': 'Fotoprotector Fusion_Water',
      'label': 'ISDIN Fotoprotector Fusion Water Magic SPF50 50ml',
      'price': 18.21,
      'stock': 3,
      'brand': {'id': 3},
      'imagePath': 'Fotoprotector_Fusion_Water.webp',
      'type': 0
    },
    {
      'id': 1,
      'productName': 'Fotoprotector Fusion_Spray',
      'label': 'Isdin Fotoprotector Transparent Spray Wet Skin SPF50 250ml',
      'price': 22.80,
      'stock': 5,
      'brand': {'id': 3},
      'imagePath': 'Fotoprotector_Fusion_Spray.webp',
      'type': 0
    },
    {
      'id': 2,
      'productName': 'Traitement Anti-transpirant',
      'label': 'Vichy Traitement Anti-Transpirant 48h Roll-On 50ml',
      'price': 8.19,
      'stock': 4,
      'brand': {'id': 4},
      'imagePath': 'Traitement_Anti-transpirant.webp',
      'type': 1
    },
  ]

  getProducts(): Observable<any> {

    return of(this.mockProducts)

  }

}
