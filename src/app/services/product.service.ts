import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../classes/product';
import { Cart } from '../interfaces/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cart = new BehaviorSubject<Cart>({
    display: false,
    products: []
  })
  listenCart = this.cart.asObservable()

  constructor() { }

  getProducts(): Observable<any> {

    return of(this.mockProducts)

  }

  mockProducts: any[] = [
    {
      'id': 0,
      'productName': 'Fotoprotector Fusion Water',
      'label': 'ISDIN Fotoprotector Fusion Water Magic SPF50 50ml',
      'description': 'Photoprotecteur à texture ultra-légère',
      'price': 18.21,
      'stock': 3,
      'brand': {'id': 3},
      'imagePath': 'Fotoprotector_Fusion_Water.webp',
      'type': 0
    },
    {
      'id': 1,
      'productName': 'Fotoprotector Fusion Spray',
      'label': 'Isdin Fotoprotector Transparent Spray Wet Skin SPF50 250ml',
      'description': 'Contribue à protéger la peau du rayonnement solaire',
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
      'description': 'Efficacité longue durée',
      'price': 8.19,
      'stock': 4,
      'brand': {'id': 4},
      'imagePath': 'Traitement_Anti-transpirant.webp',
      'type': 1
    },
    {
      'id': 3,
      'productName': 'CeraVe Gel Moussant',
      'label': 'CeraVe Gel Moussant 473ml',
      'description': 'Nettoie la peau sans altérer la barrière protectrice cutanée',
      'price': 12.00,
      'stock': 2,
      'brand': {'id': 2},
      'imagePath': 'CeraVe_Gel_Moussant.webp',
      'type': 2
    },
    {
      'id': 4,
      'productName': 'ZzzQuil Sommeil',
      'label': 'ZzzQuil Sommeil 60 Gommes',
      'description': 'Aide à réduire le temps d\'endormissement',
      'price': 17.16,
      'stock': 5,
      'brand': {'id': 1},
      'imagePath': 'ZzzQuil_Sommeil.webp',
      'type': 1
    },
    {
      'id': 5,
      'productName': 'Freestyle Libre',
      'label': 'Freestyle Libre 2 Capteur',
      'description': 'Aide à mesurer la glycémie',
      'price': 59.90,
      'stock': 4,
      'brand': {'id': 1},
      'imagePath': 'Freestyle_Libre.webp',
      'type': 1
    },
  ]

}
