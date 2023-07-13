import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Auth } from 'src/app/classes/auth';
import { DialogMessage } from 'src/app/interfaces/message';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @Input() auth!: Auth
  @Input() state: string = "create"

  authForm!: FormGroup

  isUpdated = false

  sizeTable = 4

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
//    private dialog: MatDialog,
//    public dialogRef: MatDialogRef<AuthComponent>,
//    @Inject(MAT_DIALOG_DATA) public data: DialogMessage,
  ) {
  }

  ngOnInit(): void {

    this.auth = this.authService.auth
    this.initForm(this.auth)
/*    if (this.data.delai !== 0) {
      const interval = setInterval(() => {
        this.dialogRef.close();
      },this.data.delai)
    }*/
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

      switch (this.state) {
        case 'display' : {
          this.authForm.disable()
          break
        }
        case 'update' : {
          this.authForm.enable()
          break
        }
        case 'create' : {
          this.authForm.enable()
          break
        }
      }

      this.authForm.valueChanges.subscribe(change => {
        this.isUpdated = this.checkChanges()
      })

      this.isUpdated = false

    }

  }

  checkChanges(): boolean {

    this.auth.getEmail !== this.authForm.get("email")!.value ||
    this.auth.getFirstName !== this.authForm.get("firstname")!.value ||
    this.auth.getLastName !== this.authForm.get("lastname")!.value ||
    this.auth.getAddress1 !== this.authForm.get("address1")!.value ||
    this.auth.getAddress2 !== this.authForm.get("address2")!.value ||
    this.auth.getZip !== this.authForm.get("zip")!.value ||
    this.auth.getLocality !== this.authForm.get("locality")!.value

    return this.isUpdated

  }

  saveAuth = () => {

  }

  cancel = () => {

  }

  onResizeTable = (event: UIEvent) => {
    this.sizeTable = ((event.target! as Window).innerWidth <= 800) ? 2 : 4;
  }

  get getEmail () {return this.authForm.get("email")!.value}
  get getFirstname () {return this.authForm.get("firstname")!.value}
  get getLastname () {return this.authForm.get("lastname")!.value}
  get getAddress1 () {return this.authForm.get("address1")!.value}
  get getAddress2 () {return this.authForm.get("address2")!.value}
  get getZip () {return this.authForm.get("zip")!.value}
  get getLocality () {return this.authForm.get("locality")!.value}

}
