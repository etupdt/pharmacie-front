import { Auth } from "../classes/auth";
import { Product } from "../classes/product";

export interface MailContact {
  auth: Auth,
  message: string
}
