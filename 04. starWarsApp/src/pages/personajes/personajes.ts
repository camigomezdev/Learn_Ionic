import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PERSONAJES } from "../../data/personajes.data";
import { DetallePage } from "../index.paginas";

@Component({
  selector: 'page-personajes',
  templateUrl: 'personajes.html'
})
export class PersonajesPage {

  personajesArreglo:any;
  detalle:any = DetallePage;

  constructor(public navCtrl: NavController) {
    this.personajesArreglo = PERSONAJES;
  }

}
