import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal, ModalController, ToastController } from '@ionic/angular';
import { Client } from 'src/app/entities/client';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;

  loginForm!: FormGroup

  isUpdated = false

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private clientService: ClientService,
    public modalCtrl: ModalController,
    private toastController: ToastController
  ) {
  }

  ngOnInit(): void {
    this.initForm('xavier.dupont@test.fr')
  }

  initForm = (email: string) => {

    if (email) {

      this.loginForm = this.formBuilder.group({
        email: [
          email,
          [
            Validators.required,
            Validators.email
          ]
        ],
        password: [
          'password',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(32),
            Validators.pattern(/^[0-9a-zA-Z -']{0,}$/)
          ]
        ],
        confirmpassword: [
          'password',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(32),
            Validators.pattern(/^[0-9a-zA-Z -']{0,}$/)
          ]
        ],
      })

      if (this.getAuthenticatedEmail) {
        this.loginForm.get('email')!.disable({emitEvent: false});
        this.loginForm.get('password')!.disable({emitEvent: false});
        this.loginForm.get('confirmpassword')!.disable({emitEvent: false});
      }

      this.loginForm.valueChanges.subscribe(change => {
        this.isUpdated = this.checkChanges()
      })

      this.isUpdated = false

    }

  }

  checkChanges(): boolean {

    return this.isUpdated

  }

  connect = () => {

    if (this.getAuthenticatedEmail) {
      this.authService.setRole = []
      this.authService.signalRoleUpdated.set(this.authService.role)
      this.authService.email = undefined
      this.clientService.signalClientUpdated.set(this.clientService.clientInit)
      this.authService.menuIndex = 0
      this.authService.signalMenuIndexUpdated.set(0)
      this.back()
    } else {
      this.authService.login(
        this.loginForm.get("email")!.value,
        this.loginForm.get("password")!.value
      ).subscribe({
        next: (res: any) => {
          this.clientService.getClient(res[0].id).subscribe({
            next: (res: any) => {
              this.authService.email = this.loginForm.get("email")!.value
              this.authService.setRole = res.roles
              this.authService.signalRoleUpdated.set(this.authService.role)
              this.clientService.client = new Client().deserialize(res)
              this.clientService.signalClientUpdated.set(this.clientService.client)
              this.presentToast('middle', 'Vous êtes maintenant authentifié', 1500)
              this.back()
            },
            error: (error: { error: { message: any; }; }) => {
              this.presentToast('middle', error.error.message, 800)
            }
          })
        },
        error: (error: { error: { message: any; }; }) => {
          return
        }
      })
    }

    return

  }

  back = () => {
    return this.modalCtrl.dismiss(null, 'return');
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string, duration: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
    });

    await toast.present();
  }

  get getEmail () {return this.loginForm.get("email")!.value}
  get getPassword () {return this.loginForm.get("password")!.value}
  get getAuthenticatedEmail() {return this.authService.email}

}
