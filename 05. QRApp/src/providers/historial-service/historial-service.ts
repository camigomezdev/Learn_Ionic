import { Injectable } from '@angular/core';
import { ModalController, Platform, ToastController } from "ionic-angular";
import { MapasPage } from "../../pages/index.paginas";

import { ScanData } from "../../models/Scan-data.model";

//Plugin
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { EmailComposer } from '@ionic-native/email-composer';

@Injectable()
export class HistorialServiceProvider {

  private historial:ScanData[] = []

  constructor(private iab: InAppBrowser, private modalCtrl: ModalController,
              private contacts: Contacts, private platform: Platform,
              private toastCtrl: ToastController,
              private emailComposer: EmailComposer) {
  }

  cargarHistorial(){
    return this.historial;
  }

  agregarHistorial(texto:string){
    let data:ScanData = new ScanData(texto);

    this.historial.unshift( data );
    console.log(this.historial);

    this.abrirScan(0);
  }

  abrirScan( index:number){
      let scanData=this.historial[index];
      switch(scanData.tipo){
        case 'http':
          this.iab.create(scanData.info, "_system");
        break
        case 'mapa':
          this.modalCtrl.create(MapasPage, { coords: scanData.info })
              .present();
        break
        case 'contacto':
          this.crearContacto(scanData.info);
        break
        case 'email':
          let email = this.parseCorreo(scanData.info);
          this.emailComposer.open(email);
        break
        default:
          console.error("Tipo no soportado");
        break

      }
  }

  private parseCorreo(texto:string){
    //MATMSG:TO:camigomez35@gmail.com;SUB:Correo;BODY:Texto del correo;;
    var objeto:any = {};
    texto = texto.replace("MATMSG:","");
    let info = texto.split(";");
    objeto = {'to': info[0].replace('TO:',""), 'subject': info[1].replace("SUB:",""), 'body': info[2].replace("BODY:","")}
    return objeto;
  }

  private crearContacto(texto:string){
    let campos:any = this.parse_vcard(texto);
    console.log(campos);

    let nombre = campos['fn'];
    let tel = campos.tel[0].value[0];

    if(!this.platform.is('cordova')){
      console.log("Estoy en el pc");
      return;
    }

    let contact: Contact = this.contacts.create();
    contact.name = new ContactName(null, nombre);
    contact.phoneNumbers = [new ContactField('mobile', tel)];

    contact.save().then(
      () => this.crearToast("Contacto: "+ nombre+ " creado" ),
      (error) => this.crearToast("El contacto: " + nombre + " no pudo ser creado")
    );
  }

  private crearToast(mensaje:string){
    this.toastCtrl.create({
      message: mensaje,
      duration: 2500}).present();
  }

  private parse_vcard( input:string ) {
    var Re1 = /^(version|fn|title|org):(.+)$/i;
    var Re2 = /^([^:;]+);([^:]+):(.+)$/;
    var ReKey = /item\d{1,2}\./;
    var fields = {};

    input.split(/\r\n|\r|\n/).forEach(function (line) {
        var results, key;

        if (Re1.test(line)) {
            results = line.match(Re1);
            key = results[1].toLowerCase();
            fields[key] = results[2];
        } else if (Re2.test(line)) {
            results = line.match(Re2);
            key = results[1].replace(ReKey, '').toLowerCase();

            var meta = {};
            results[2].split(';')
                .map(function (p, i) {
                var match = p.match(/([a-z]+)=(.*)/i);
                if (match) {
                    return [match[1], match[2]];
                } else {
                    return ["TYPE" + (i === 0 ? "" : i), p];
                }
            })
                .forEach(function (p) {
                meta[p[0]] = p[1];
            });

            if (!fields[key]) fields[key] = [];

            fields[key].push({
                meta: meta,
                value: results[3].split(';')
            })
        }
    });
    return fields;
  };
}
