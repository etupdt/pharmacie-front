import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from 'src/app/entities/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  auth!: Auth

  authForm!: FormGroup

  isUpdated = false

  sizeTable = 4

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {

    if (!this.authService.auth)
      this.authService.auth = this.authService.authInit
    this.initForm(this.authService.auth)

  }

  initForm = (auth: Auth) => {

    if (auth) {

      this.authForm = this.formBuilder.group({
        email: [
          auth.getEmail,
          [
            Validators.required,
            Validators.email
          ]
        ],
        firstname: [
          auth.getFirstName,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(32),
            Validators.pattern(/^[0-9a-zA-Z -']{0,}$/)
          ]
        ],
        lastname: [
          auth.getLastName,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(32),
            Validators.pattern(/^[0-9a-zA-Z -']{0,}$/)
          ]
        ],
        address1: [
          auth.getAddress1,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.pattern(/[0-9a-zA-Z -+*_='/]{0,}/),
          ]
        ],
        address2: [
          auth.getAddress2,
          [
            Validators.pattern(/[0-9a-zA-Z -+*_='/]{0,}/),
          ]
        ],
        zip: [
          auth.getZip,
          [
            Validators.required,
            Validators.pattern(/[0-9]{0,}/),
            Validators.minLength(5),
            Validators.maxLength(5),
          ]
        ],
        locality: [
          auth.getLocality,
          [
            Validators.required,
            Validators.minLength(1),
            Validators.pattern(/[0-9a-zA-Z -+*_='/]{0,}/),
          ]
        ],
      })

      this.authForm.valueChanges.subscribe(change => {
        this.isUpdated = this.checkChanges()
      })

      this.isUpdated = false

    }

  }

  checkChanges(): boolean {

    this.authService.auth.getEmail !== this.authForm.get("email")!.value ||
    this.authService.auth.getFirstName !== this.authForm.get("firstname")!.value ||
    this.authService.auth.getLastName !== this.authForm.get("lastname")!.value ||
    this.authService.auth.getAddress1 !== this.authForm.get("address1")!.value ||
    this.authService.auth.getAddress2 !== this.authForm.get("address2")!.value ||
    this.authService.auth.getZip !== this.authForm.get("zip")!.value ||
    this.authService.auth.getLocality !== this.authForm.get("locality")!.value

    return this.isUpdated

  }

  saveAuth = () => {

    this.authService.auth = new Auth(
      1,
      this.authForm.get("email")!.value,
      this.authForm.get("firstname")!.value,
      this.authForm.get("lastname")!.value,
      this.authForm.get("address1")!.value,
      this.authForm.get("address2")!.value,
      this.authForm.get("zip")!.value,
      this.authForm.get("locality")!.value
    )

  }

  get getEmail () {return this.authForm.get("email")!.value}
  get getFirstname () {return this.authForm.get("firstname")!.value}
  get getLastname () {return this.authForm.get("lastname")!.value}
  get getAddress1 () {return this.authForm.get("address1")!.value}
  get getAddress2 () {return this.authForm.get("address2")!.value}
  get getZip () {return this.authForm.get("zip")!.value}
  get getLocality () {return this.authForm.get("locality")!.value}

}
