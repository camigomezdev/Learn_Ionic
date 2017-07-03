import { Component } from '@angular/core';
import { ViewController, ToastController, Platform } from 'ionic-angular';

//Plugin
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';

@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  titulo:string = "";
  imgPreview:string = null;
  img: string = null;

  constructor(private viewCtrl: ViewController, private camera: Camera,
              private toastCtrl: ToastController, private platForm: Platform,
              private imagePicker: ImagePicker) {
  }

  cerrar_modal(){

    this.viewCtrl.dismiss();
  }

  abrir_camara(){

    if (!this.platForm.is("cordova")){
      this.mostrar_toast("Error: Estamos en el pc");
      return;
    }

    const options: CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     this.imgPreview = 'data:image/jpeg;base64,' + imageData;
     //Guardar en firebase
     this.img = imageData;

    }, (err) => {
     this.mostrar_toast("Error" + err);
     console.error("Error en la camara " + err);
    });
  }

  private mostrar_toast(texto:string){
    this.toastCtrl.create({
      message: texto,
      duration:  2500
    }).present();
  }

}
