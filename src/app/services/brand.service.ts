import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Brand } from '../entities/brand';
import { ProductType } from '../enums/product-type';
import { ProductsType } from '../interfaces/products-type.interface';
import mockBrands from '../../assets/data/mockBrands.json'

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  brands = new BehaviorSubject<Brand[]>([])
  listenBrands = this.brands.asObservable()
  brands$!: Brand[]

  productTypes = new BehaviorSubject<ProductsType[]>([])
  listenProductTypes = this.productTypes.asObservable()

  refresh = new BehaviorSubject<number>(0)
  listenRefresh = this.refresh.asObservable()

  constructor() {
    this.listenBrands.subscribe((brands) => {this.brands$ = brands as Brand[]})
    of(mockBrands).subscribe({
      next: (res: any[]) => {
        res.forEach(b => {
          return this.brands$.push(new Brand(
            b.id,
            b.brandName,
            b.imagePath
          ));
        })
      },
      error: (error: { error: { message: any; }; }) => {
      }
    })
  }

}
