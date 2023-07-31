import { Product } from "../entities/product";

export interface Cart {
  display: boolean,
  detail: {
    qte: number,
    product: Product
  }[]
}
