import { Auth } from "../classes/auth";
import { Product } from "../classes/product";

export interface Mail {
  auth: Auth,
  command: {
    qte: number,
    product: Product
  }[]
}
