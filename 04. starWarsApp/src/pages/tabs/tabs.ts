import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PersonajesPage, AudioPage, MensajesPage } from "../index.paginas";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  personajes:any;
  audio:any;
  mensajes:any;

  constructor(public navCtrl: NavController) {
      this.personajes = PersonajesPage;
      this.mensajes = MensajesPage;
      this.audio = AudioPage;
  }
}
