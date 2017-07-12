import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-pagina2',
  templateUrl: 'pagina2.html',
})
export class Pagina2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ir_pagina3(){
    this.navCtrl.push("mi-pagina3");
  }

  ionViewDidLoad(){
    console.log("ionViewDidLoad");
  }

  ionViewWillEnter(){
    console.log("ionViewWillEnter");
  }

  ionViewWillLeave(){
    console.log("ionViewWillLeave");
  }

  ionViewDidLeave(){
    console.log("ionViewDidLeave");
  }

  ionViewWillUnload(){
    console.log("ionViewWillUnload");
  }

  ionViewCanEnter(){
    console.log("ionViewCanEnter");

    let numero = Math.round(Math.random()*10);
    console.log(numero);
    if(numero>=3){
      return true;
    }else{
      return false;
    }


  }

  ionViewCanLeave(){
    console.log("ionViewCanLeave");

    console.log("Espere dos segundos para salir");

    let promesa = new Promise(( resolve, reject )=>{
      setTimeout( () => {
        resolve(true)
      }, 2000);
    });

    return promesa;
  }
}
