import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../entities/product';
import { Filter } from '../interfaces/filter.interface';
import { Cart } from '../interfaces/cart.interface';
import { Brand } from '../entities/brand';
import { ProductsType } from '../interfaces/products-type.interface';

@Pipe({
  name: 'filterProduct'
})
export class FilterProductPipe implements PipeTransform {

  transform(products: Product[], ...args: unknown[]): Product[] {

    let brands!: Brand[]
    if ((args[0] as Brand[]).length > 0) {
      brands = (args[0] as Brand[]).filter(brand => brand.checked)
    }

    let productTypes: ProductsType[] = []
    if ((args[1] as ProductsType[]).length > 0) {
      productTypes = (args[1] as ProductsType[]).filter(productType => productType.checked)
    }

    const filters = args[2] as Filter[]

    return products.filter((product: Product) => {

      let returnValue = true

      if (brands.length > 0 && brands.findIndex(brand => brand.getId === product.getBrand.getId) < 0) {

        returnValue = false

      }
      else if (productTypes.length > 0 && productTypes.findIndex(productType => productType.productType === product.getType) < 0) {

        returnValue = false

      }/*
      else {

        filters.forEach(filter => {

        switch (filter.name) {

          case 'Prix' : {
            if (product.getPrice < filter.startValue || product.getPrice > filter.endValue)
              returnValue = false
            break
          }

        }

      })

    }*/

      return returnValue

    });

  }

}
