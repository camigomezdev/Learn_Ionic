import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { Pagina2Page } from "../pages/pagina2/pagina2";

//Plugins
import { IonicStorageModule } from '@ionic/storage';
import { AjustesServicesProvider } from '../providers/ajustes-services/ajustes-services';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Pagina2Page,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Pagina2Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AjustesServicesProvider
  ]
})
export class AppModule {}
