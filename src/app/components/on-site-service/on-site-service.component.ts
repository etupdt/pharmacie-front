import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { InputCustomEvent, ToastController } from '@ionic/angular';
import { Dimensions, ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { OnSiteService } from 'src/app/entities/on-site-service';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { OnSiteServiceService } from 'src/app/services/on-site-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-on-site-service',
  templateUrl: './on-site-service.component.html',
  styleUrls: ['./on-site-service.component.scss'],
})
export class OnSiteServiceComponent  implements OnInit {
  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent | undefined;

  onSiteService!: OnSiteService

  backendImages = environment.useBackendImages

  showCropper = true;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  imageURL: string = ''

  imageSaved: string = ''

  image: string = ''

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.image = event.base64 as string
    this.croppedImage = event.base64;
  }

  imageLoaded() {
      this.showCropper = true;
  }

  cropperReady(sourceImageDimensions: Dimensions) {
      console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
      console.log('Load failed');
  }

  constructor(
    private onSiteServiceService: OnSiteServiceService,
    private toastController: ToastController,
    private router: Router,
  ) { }

  ngOnInit() {
    if (!this.onSiteService)
      this.onSiteService = new OnSiteService().deserialize(history.state)
    if (this.onSiteService.getImagePath !== '') {
      this.imageSaved = this.onSiteService.getImagePath
      this.imageURL = this.backendImages + '/onsiteservices/' + this.onSiteService.getImagePath
    }
  }

  replaceImage = () => {
    this.onSiteService.setImagePath = this.image
    this.refresh()
  }

  reinitImage = () => {
//    this.fileChangeEvent(null)
    this.fileChangeEvent(null)
    this.croppedImage = ''
    this.onSiteService.setImagePath = this.imageSaved
    this.imageURL = ''
    this.imageURL = this.backendImages + '/onsiteservices/' + this.onSiteService.getImagePath
    this.imageLoaded()
    this.refresh()
  }

  saveOnSiteService = () => {

    if (this.onSiteService.getId === 0) {

      this.onSiteServiceService.postOnSiteService(this.onSiteService).subscribe({
        next: (res: any) => {
            this.presentToast('middle', 'La prestation a été créée', 800)
            this.onSiteServiceService.onSiteServices.push(new OnSiteService().deserialize(res))          
            this.router.navigate(['/VisiteurMenu/Prestations'])
        },
        error: (error: { error: { message: any; }; }) => {
          this.presentToast('middle', error.error.message, 800)
        }
      })

    } else {

      this.onSiteServiceService.putOnSiteService(this.onSiteService).subscribe({
        next: (res: any) => {
            this.presentToast('middle', 'La prestation a été mise à jour', 800)
            let index = this.onSiteServiceService.onSiteServices.findIndex(onSiteService => onSiteService.getId === res.id)
            this.onSiteServiceService.onSiteServices[index].setOnSiteServiceName = res.onSiteServiceName
            this.onSiteServiceService.onSiteServices[index].setDescription = res.description
            this.onSiteServiceService.onSiteServices[index].setDuree = res.duree
            this.onSiteServiceService.onSiteServices[index].setPrice = res.price
            this.onSiteServiceService.onSiteServices[index].setImagePath = res.imagePath
            this.router.navigate(['/VisiteurMenu/Prestations'])
        },
        error: (error: { error: { message: any; }; }) => {
          this.presentToast('middle', error.error.message, 800)
        }
      })

    }


  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string, duration: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
    });

    await toast.present();
  }

  onChangeName = (event: Event) => {
    this.onSiteService.setOnSiteServiceName = (event as InputCustomEvent).detail.value!
    this.refresh()
  }

  onChangeDescription = (event: Event) => {
    this.onSiteService.setDescription = (event as InputCustomEvent).detail.value!
    this.refresh()
  }

  onChangeDuree = (event: Event) => {
    this.onSiteService.setDuree = +(event as InputCustomEvent).detail.value!
    this.refresh()
  }

  onChangePrice = (event: Event) => {
    this.onSiteService.setPrice = +(event as InputCustomEvent).detail.value!
    this.refresh()
  }

  refresh = () => {
    this.onSiteServiceService.refreshUpdate++
    this.onSiteServiceService.signalRefresUpdateUpdated.set(this.onSiteServiceService.refreshUpdate)
  }

}
