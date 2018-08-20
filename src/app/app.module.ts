import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { WellcomePage } from '../pages/wellcome/wellcome';
import { TodasLasNotasFinalesPage } from '../pages/todas_las_notas_finales/todas_las_notas_finales';
import { ParcialesPage } from '../pages/parciales/parciales';
import { PreInscripcionesPage } from '../pages/pre-inscripciones/pre-inscripciones';
import { InscripcionesPage } from '../pages/inscripciones/inscripciones';
import { ListPage } from '../pages/list/list';
import { CuentasPage } from '../pages/cuentas/cuentas';
import { ExtensionPage } from '../pages/extension/extension';
import { ModalActividadDetallePage } from '../pages/modal-actividad-detalle/modal-actividad-detalle';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {HttpClientModule} from '@angular/common/http';
import { Global } from './global';
import { CalificacionService } from './services/calificacion.service';
import { ParcialService } from './services/parcial.service';
import { CuentaService } from './services/cuenta.service';
import { ExtensionService } from './services/extension.service';
import { PreinscripcionService } from './services/preinscripcion.service';
import { MessageService } from './services/message.service';
import { LoadingService } from './services/loading.service';
import { FacultadService } from './services/facultad.service';
import { InscripcionExamenesService } from './services/inscripcion.examenes.service';
import { NgPipesModule } from 'ngx-pipes';
import { AuthService } from '../providers/auth-service/auth-service';
import { StorageProvider } from '../providers/storage/storage';
import { ToastService } from './services/toast.service'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomInterceptor } from './httpInterceptor';
import { InscripcionExamenPage } from '../pages/inscripcion-examen/inscripcion-examen';
import { InscripcionExamenConfirmadoPage } from '../pages/inscripcion-examen-confirmado/inscripcion-examen-confirmado';
import { InscripcionExamenInscribirPage } from '../pages/inscripcion-examen-inscribir/inscripcion-examen-inscribir';
import { PreInscripcionesInscribirPage } from '../pages/pre-inscripciones-inscribir/pre-inscripciones-inscribir';
import { ModalAsignaturaDetailPage } from '../pages/modal-asignatura-detail/modal-asignatura-detail';

@NgModule({
  declarations: [
    MyApp,
    WellcomePage,
    TodasLasNotasFinalesPage,
    ParcialesPage,
    CuentasPage,
    ListPage,
    ExtensionPage,
    ModalActividadDetallePage,
    PreInscripcionesPage,
    InscripcionesPage,
    InscripcionExamenPage,
    InscripcionExamenConfirmadoPage,
    InscripcionExamenInscribirPage,
    PreInscripcionesInscribirPage,
    ModalAsignaturaDetailPage
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
    TodasLasNotasFinalesPage,
    CuentasPage,
    ParcialesPage,
    ExtensionPage,
    ModalActividadDetallePage,
    InscripcionExamenPage,
    ListPage,
    PreInscripcionesPage,
    InscripcionesPage,
    InscripcionExamenConfirmadoPage,
    InscripcionExamenInscribirPage,
    PreInscripcionesInscribirPage,
    ModalAsignaturaDetailPage
  ],
  providers: [
    Global,
    AuthService,
    CalificacionService,
    ParcialService,
    CuentaService,
    ExtensionService,
    MessageService,
    LoadingService,
    FacultadService,
    PreinscripcionService,
    InscripcionExamenesService,
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
