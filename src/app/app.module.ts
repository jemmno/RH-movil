import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { WellcomePage } from '../pages/wellcome/wellcome';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {HttpClientModule} from '@angular/common/http';
import { Global } from './global';
import { MessageService } from './services/message.service';
import { LoadingService } from './services/loading.service';
import { NgPipesModule } from 'ngx-pipes';
import { AuthService } from '../providers/auth-service/auth-service';
import { StorageProvider } from '../providers/storage/storage';
import { ToastService } from './services/toast.service'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomInterceptor } from './httpInterceptor';

import { AsistenciasPage } from '../pages/asistencias/asistencias';

@NgModule({
  declarations: [
    MyApp,
    WellcomePage,
    AsistenciasPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    NgPipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WellcomePage,
    AsistenciasPage
  ],
  providers: [
    Global,
    AuthService,
    MessageService,
    LoadingService,
    ToastService,
    StatusBar,
    SplashScreen,

    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageProvider,
    { provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor ,
      multi: true },
  ]
})
export class AppModule {}
