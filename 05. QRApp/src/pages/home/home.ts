import { Component } from '@angular/core';
import { ToastController, Platform } from 'ionic-angular';

//Plugin
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

//Servicios
import { HistorialServiceProvider } from "../../providers/historial-service/historial-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private barcodeScanner: BarcodeScanner,
              public toastCtrl: ToastController,
              private platform:Platform,
              private historialService:HistorialServiceProvider) {}

  scan(){
    console.log("Scanner activado");

    if(!this.platform.is('cordova')){
      //this.historialService.agregarHistorial("http://google.com");
      // this.historialService.agregarHistorial("geo:6.2530408, -75.56457369999998");
      /*this.historialService.agregarHistorial( `BEGIN:VCARD
VERSION:2.1
N:Kent;Clark
FN:Clark Kent
ORG:
TEL;HOME;VOICE:12345
TEL;TYPE=cell:67890
ADR;TYPE=work:;;;
EMAIL:clark@superman.com
END:VCARD` );*/
      this.historialService.agregarHistorial("MATMSG:TO:camigomez35@gmail.com;SUB:Correo;BODY:Texto del correo;;");
      return;
    }

      this.barcodeScanner.scan().then((barcodeData) => {
       // Success! Barcode data is here
       console.log("Result: " + barcodeData.text + "\n" +
                  "Format: " + barcodeData.format + "\n" +
                  "Cancelled: " + barcodeData.cancelled);

      if(barcodeData.cancelled==false && barcodeData.text != null){
        this.historialService.agregarHistorial(barcodeData.text);
      }
      }, (err) => {
          // An error occurred
          this.mostrarError("Error: "+err);
      });

  }

  mostrarError(mensaje:string){
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 1500
    });
    toast.present();

  }
}
