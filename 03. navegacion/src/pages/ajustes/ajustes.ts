import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { ModalPage } from "../index.paginas";

@Component({
  selector: 'page-ajustes',
  templateUrl: 'ajustes.html',
})
export class AjustesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private modalCtrl: ModalController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjustesPage');
  }

  activarPrincipal(){
    this.navCtrl.parent.select(0);
  }

  mostrarModal(){

    let modal = this.modalCtrl.create( ModalPage, {nombre: "Camila", edad: "21"} );
    modal.present();
    modal.onDidDismiss(parametros=>{
      console.log(parametros);
    });
  }


}
