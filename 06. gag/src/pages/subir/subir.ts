import { Component } from '@angular/core';
import { ViewController, ToastController, Platform, LoadingController } from 'ionic-angular';

//Plugin
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

//provider
import { CargaArchivosProvider } from "../../providers/carga-archivos/carga-archivos";

@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  titulo:string = "";
  imgPreview:string = null;
  img: string = "";

  constructor(private viewCtrl: ViewController, private camera: Camera,
              private toastCtrl: ToastController, private platForm: Platform,
              private imagePicker: ImagePicker, private caService:CargaArchivosProvider,
              public loadingCtrl: LoadingController) {
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

  mostrar_album(){
    if (!this.platForm.is("cordova")){
      this.mostrar_toast("Error: Estamos en el pc");
      return;
    }

    let options:ImagePickerOptions = {
      maximumImagesCount: 1,
      quality: 40,
      outputType: 1
    };

    this.imagePicker.getPictures(options)
         .then((results) => {
      console.log(results);
      for(let image of results){
        this.imgPreview = image;
        //Guardar en firebase
        this.img = image;
        break;
      }
    }, (err) => {
      this.mostrar_toast("Error seleccionando " + err);
      console.error("Error seleccionando " + JSON.stringify(err));
    });
  }

  crear_post(){
    console.log("Subiendo imagen");
    let archivo = {
      'titulo': this.titulo,
      'img': this.img
    };

    let loader = this.loadingCtrl.create({
      content: "Por favor espere"
    });
    loader.present();

    this.caService.cargar_imagenes_firebase(archivo)
        .then(
          ()=>{
            loader.dismiss();
            this.cerrar_modal();
          },
          (error)=>{
            loader.dismiss();
            this.mostrar_toast("Error al cargar: "+error);
            console.log("Error al cargar: ", JSON.stringify(error));
          }
        );
  }

  private mostrar_toast(texto:string){
    this.toastCtrl.create({
      message: texto,
      duration:  2500
    }).present();
  }

}
