import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../classes/brand';
import { Product } from '../classes/product';
import { Filter } from '../interfaces/filter.interface';
import { BrandFilter } from '../interfaces/brand-filter.interface';
import { Cart } from '../interfaces/cart.interface';

@Pipe({
  name: 'filterProduct'
})
export class FilterProductPipe implements PipeTransform {

  transform(products: Product[], ...args: unknown[]): Product[] {

    const brandsId = args[0] as number[]
    const cart = args[1] as Cart
    const filters = args[1] as Filter[]

    return products.filter((product: Product) => {

      let returnValue = true

      if (cart.display && cart.products.findIndex(cartProduct => cartProduct.getId === product.getId) < 0) {

        returnValue = false

      }
      else if (brandsId.length > 0 && brandsId.findIndex(id => id === product.getBrand.getId) < 0) {

          returnValue = false

      }
      else {

/*        filters.forEach(filter => {

        switch (filter.name) {

          case 'Prix' : {
            if (product.getPrice < filter.startValue || product.getPrice > filter.endValue)
              returnValue = false
            break
          }

        }

      })
*/
    }

      return returnValue

    });

  }

}
