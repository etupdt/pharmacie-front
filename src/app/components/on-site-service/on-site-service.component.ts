import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { InputCustomEvent, ToastController } from '@ionic/angular';
import { Dimensions, ImageCroppedEvent, ImageCropperComponent, ImageTransform } from 'ngx-image-cropper';
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
  imageChangedEvent: any;
  croppedImage: any = '';
  imageURL: string = ''
  rotation = 0;
  scale = 1;
  transform: ImageTransform = {};

  imageSaved: any
  imageURLSaved: any
  imageFile: any
  image: any

  fileChangeEvent(event: any): void {
    if (!event || event.target.files[0])
      this.imageFile = event.target.files[0]
//      this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.blob;
    console.log('cropped', this.croppedImage)
  }

  imageLoaded() {
      this.showCropper = true;
  }

  zoomOut() {
    this.scale -= .1;
    this.transform = {
        ...this.transform,
        scale: this.scale
    };
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
        ...this.transform,
        scale: this.scale
    };
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
    private imageService: ImageService
  ) { }

  ngOnInit() {

    if (!this.onSiteService)
      this.onSiteService = new OnSiteService().deserialize(history.state)

    this.imageURLSaved = this.backendImages + '/onsiteservices/' + this.onSiteService.getImagePath

    if (this.onSiteService.getImagePath !== '') {
      this.imageService.getImage( this.backendImages + '/onsiteservices/' + this.onSiteService.getImagePath).subscribe({
        next: (res: Blob) => {
          this.imageFile = res
          this.imageSaved = res
          var reader = new FileReader();
          reader.readAsDataURL(res);
          reader.onload = () => {
            this.image = reader.result as string
          }
        }
      })
    }

  }

  replaceImage = () => {
    var reader = new FileReader();
    reader.readAsDataURL(this.croppedImage);
    reader.onload = () => {
      this.onSiteService.setImagePath = reader.result as string
    }
    this.refresh()
  }

  reinitImage = () => {
    this.imageFile = this.imageSaved
    this.onSiteService.setImagePath = this.image
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
