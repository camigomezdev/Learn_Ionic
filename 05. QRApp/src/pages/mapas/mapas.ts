import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-mapas',
  templateUrl: 'mapas.html',
})
export class MapasPage {

  lat: number;
  lng: number;
  zoom=15;
  constructor(public navParams: NavParams,
              private viewCtrl: ViewController) {

      let coordsArray = this.navParams.get("coords").split(",");
      this.lat = Number(coordsArray[0].replace("geo:",""));
      this.lng = Number(coordsArray[1]);
      console.log(this.lng, this.lat);
  }


  cerrarModal(){
    this.viewCtrl.dismiss();
  }
}
