import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { SubirPage } from "../subir/subir";

//providers
import { CargaArchivosProvider } from "../../providers/carga-archivos/carga-archivos";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  hayMas:boolean = true;

  constructor(private modalCtrl: ModalController,
              private caService: CargaArchivosProvider,
              private _auth: AuthServiceProvider) {
        this.caService.cargar_imagenes();
  }

  cargar_siguiente(infiniteScroll:any){
      console.log("Siguientes");
      this.caService.cargar_imagenes()
          .then(
            ( existenMas:boolean )=>{
              infiniteScroll.complete();
              this.hayMas = existenMas;
            }
          );
  }

  mostrar_modal(){
      let modal = this.modalCtrl.create(SubirPage);
      modal.present();
  }

  salir(){
    this._auth.signOut();
  }

  iniciar(): void {
    this._auth.signInWithFacebook()
      .then(() => this.onSignInSuccess());
  }

  private onSignInSuccess(): void {
    console.log("Facebook nombre: ",this._auth.displayName());
  }

}
