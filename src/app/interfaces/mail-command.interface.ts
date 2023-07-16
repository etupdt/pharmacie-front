import { Auth } from "../classes/auth";
import { Product } from "../classes/product";

export interface MailCommand {
  auth: Auth,
  command: {
    qte: number,
    product: Product
  }[]
}
