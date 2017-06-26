import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { PersonajesPage,
        AudioPage,
        MensajesPage,
        TabsPage,
        DetallePage} from '../pages/index.paginas';

@NgModule({
  declarations: [
    MyApp,
    PersonajesPage,
    AudioPage,
    MensajesPage,
    TabsPage,
    DetallePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {backButtonText: 'Atras'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PersonajesPage,
    AudioPage,
    MensajesPage,
    TabsPage,
    DetallePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
