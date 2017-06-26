import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html'
})
export class DetallePage {

  personaje:any={};

  constructor(private navParams: NavParams,
              private navCtrl: NavController) {
      this.personaje = this.navParams.get('personaje');
      console.log(this.personaje);
  }

  regresar(){
    this.navCtrl.pop();
  }

}
