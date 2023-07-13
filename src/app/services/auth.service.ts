import { Injectable } from '@angular/core';
import { Auth } from '../classes/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth!: Auth

  constructor() { }

  authInit = new Auth(0, '', '', '', '', '', '', '')

}
