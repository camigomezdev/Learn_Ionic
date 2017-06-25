import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  nombre:string = "";
  edad:number =0;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.nombre = this.navParams.get("nombre");
    this.edad = this.navParams.get("edad");
    console.log(this.nombre, this.edad);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  cerrarConParametros(){
    let data = {nombre: "Maria", edade: "21", coords: {lat: 20, lng:-10}};
    this.viewCtrl.dismiss( data );

  }

  cerrarSinParametros(){
      this.viewCtrl.dismiss();
  }

}
