import { Auth } from "../entities/auth";

export interface MailContact {
  auth: Auth,
  message: string
}
