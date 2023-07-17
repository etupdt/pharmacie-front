import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  message!: string

  contactForm!: FormGroup

  isUpdated = false

  sizeTable = 4

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {

    if (!this.authService.auth)
      this.authService.auth = this.authService.authInit

    this.message = ''

    this.initForm(this.message)

  }

  initForm = (message: string) => {

    this.contactForm = this.formBuilder.group({
      message: [
        message,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(32),
          Validators.pattern(/^[0-9a-zA-Z -']{0,}$/)
        ]
      ],
    })

    this.contactForm.valueChanges.subscribe(change => {
      this.isUpdated = this.checkChanges()
    })

    this.isUpdated = false

  }

  checkChanges(): boolean {

    this.message !== this.contactForm.get("message")!.value

    return this.isUpdated

  }

  onResizeTable = (event: UIEvent) => {
    this.sizeTable = ((event.target! as Window).innerWidth <= 800) ? 2 : 4;
  }

  sendMail = () => {

    this.contactService.sendMail({
      auth: this.authService.auth,
      message: this.getMessage
    }).subscribe({
      next: (res: any[]) => {
        this.message = ''
        this.initForm(this.message)
        this.dialog.open(MessageDialogComponent, {
          data: {
            type: 'Information',
            message1: `Le mail de contact a été envoyé`,
            message2: '',
            delai: 2000
          }
        })
      },
      error: (error: { error: { message: any; }; }) => {
        this.dialog.open(MessageDialogComponent, {
          data: {
            type: 'Erreur',
            message1: `Erreur lors de l\'envoi du mail de contact`,
            message2: error.error.message,
            delai: 0
          }
        })
      }
    })

  }


  get getMessage () {return this.contactForm.get("message")!.value}

}
