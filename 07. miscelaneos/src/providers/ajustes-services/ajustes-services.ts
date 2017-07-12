import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Platform } from "ionic-angular";

@Injectable()
export class AjustesServicesProvider {

  ajustes = {
    mostrar_tutorial: true
  }

  constructor(private platform: Platform, private storage: Storage) {
    console.log('Hello AjustesServicesProvider Provider');
  }

  cargar_storage() {

    return new Promise(( resolve, reject ) => {
      if(this.platform.is("cordova")){
        //Estamos en el dispositivo
        console.log("Inicializando Storage");

        this.storage.ready()
            .then( () => {
              console.log("Storage listo");
              this.storage.get("ajustes")
                  .then( (ajustes)=> {

                    if(ajustes){
                      this.ajustes = ajustes;

                    }
                    resolve();
                  });
            });
      }else{
        //Estamos en el pc
        if(localStorage.getItem("ajustes")){
          this.ajustes = JSON.parse(localStorage.getItem("ajustes"));
        }
        resolve();
      }

    });
  }

  guardar_storage(){
    if(this.platform.is("cordova")){
      //Estamos en el dispositivo

      this.storage.ready().then( () =>{
          this.storage.set("ajustes", this.ajustes);
      })
    }else{
      //Estamos en el pc
      localStorage.setItem("ajustes", JSON.stringify(this.ajustes));
    }
  }
}
