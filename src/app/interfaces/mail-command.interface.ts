import { Auth } from "../entities/auth";
import { Product } from "../entities/product";

export interface MailCommand {
  auth: Auth,
  command: {
    qte: number,
    product: Product
  }[]
}
