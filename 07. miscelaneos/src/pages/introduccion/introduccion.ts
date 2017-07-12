import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from "../home/home";

import { AjustesServicesProvider } from "../../providers/ajustes-services/ajustes-services";

/**
 * Generated class for the IntroduccionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-introduccion',
  templateUrl: 'introduccion.html',
})
export class IntroduccionPage {
  slides:any[] = [
    {
      title: "Bienvenido!!!",
      description: "Esta <b>aplicación</b> nos ayudará a comprender muchos temas interesantes en ionic!",
      image: "assets/img/ica-slidebox-img-1.png",
    },
    {
      title: "¿Qué es ionic?",
      description: "<b>Ionic Framework</b> es un SDK abierto que le permite a los desarrolladores crear aplicaciones móviles de alta calidad con el conocimiento de JavaScript, CSS y HTML.",
      image: "assets/img/ica-slidebox-img-2.png",
    },
    {
      title: "¿Que hace esta app?",
      description: "Esta aplicación nos ayudará a conocer más sobre el ciclo de vida de un componente y el storage!",
      image: "assets/img/ica-slidebox-img-3.png",
    }
  ];

  constructor(public navCtrl: NavController,
              private ajustesService: AjustesServicesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroduccionPage');
  }

  saltar_tutorial(){
    this.ajustesService.ajustes.mostrar_tutorial = false;
    this.ajustesService.guardar_storage();
    this.navCtrl.setRoot( HomePage );
  }

}
