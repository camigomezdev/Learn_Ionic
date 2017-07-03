import { Injectable } from '@angular/core';
import { ToastController, Platform } from "ionic-angular";
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from "firebase";

import { SocialSharing } from '@ionic-native/social-sharing';

@Injectable()
export class CargaArchivosProvider {

  private CARPETA_IMAGENES: string = "img";
  private POSTS:string = "posts";

  imagenes:any[]=[];
  lastKey:string  = undefined;

  constructor( public afdb: AngularFireDatabase,
              private toastCtrl: ToastController,
              private socialSharing: SocialSharing,
              private platForm:Platform) {
  }


  cargar_imagenes(){
    return new Promise( ( resolve, reject )=>{
      this.afdb.list("/posts", {
          query:{
            limitToLast: 4,
            orderByKey: true,
            endAt: this.lastKey
          }
      }).subscribe( posts => {
        if(this.lastKey){
          posts.pop();
        }

        if(posts.length==0){
          console.log("Ya no hay mas registros");
          resolve(false);
          return;
        }

        this.lastKey = posts[0].$key;

        for(let i = posts.length-1; i>=0; i--){
          let post = posts[i];
          this.imagenes.push( post );
        }

        resolve(true);
      });
    });
  }

  cargar_imagenes_firebase( archivo:archivoSubir){

    let promesa = new Promise( (resolve, reject)=>{
      this.mostrar_toast("Inicio de carga");
      let storageRef = firebase.storage().ref();
      let nombreArchivo = new Date().valueOf();
      let uploadTask:firebase.storage.UploadTask = storageRef.child(`${ this.CARPETA_IMAGENES }/${ nombreArchivo }`)
          .putString(archivo.img, 'base64', { contentType: 'image/jpeg' });

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {}, // Saber el avance
        (error) => {
          console.log("Error al subir: ", JSON.stringify(error));
          this.mostrar_toast("Error al cargar: "+ JSON.stringify(error));
          reject(error);
        }, //Manejo de errores
        () => {
          let url = uploadTask.snapshot.downloadURL;
          this.mostrar_toast("Imagen cargada exitosamente");
          this.crearPost( archivo.titulo, url );
          resolve();

        } //Terminó el proceso
      );
    } );

    return promesa;

  }

  private crearPost( titulo:string, url:string){
    let post:archivoSubir  ={
      img:url,
      titulo:titulo
    };

    let $key = this.afdb.database.ref(`/${this.POSTS}`).push(post).key;
    post.$key = $key;

    this.imagenes.push( post );
  }

  compartir(mensaje:string, imagen:string){

    if (!this.platForm.is("cordova")){
      this.mostrar_toast("Error: Estamos en el pc");
      return;
    }

    this.socialSharing.shareViaFacebook(mensaje, imagen, null)
      .then(() => {
        this.mostrar_toast("La imagen ha sido compartida");
      }).catch(( err ) => {
        // Error!
        this.mostrar_toast("Error al compartir la imagen" + err);
      });
  }

  private mostrar_toast(texto:string){
    this.toastCtrl.create({
      message: texto,
      duration: 2500
    }).present();
  }
}


interface archivoSubir{
  $key?:string;
  img:string;
  titulo:string;
}
