import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AlertController } from 'ionic-angular';

import { TodasLasNotasFinalesPage } from '../pages/todas_las_notas_finales/todas_las_notas_finales';
import { ParcialesPage } from '../pages/parciales/parciales';
import { CuentasPage } from '../pages/cuentas/cuentas';
import { ExtensionPage } from '../pages/extension/extension';
import { PreInscripcionesPage } from '../pages/pre-inscripciones/pre-inscripciones';
import { InscripcionesPage } from '../pages/inscripciones/inscripciones';
import { InscripcionExamenPage } from '../pages/inscripcion-examen/inscripcion-examen';
import { AuthService } from '../providers/auth-service/auth-service';
import { LoginPage } from '../pages/login/login';
import { StorageProvider } from '../providers/storage/storage';
import { Observable } from "rxjs";
import { Events } from 'ionic-angular';
import { PreInscripcionesInscribirPage } from '../pages/pre-inscripciones-inscribir/pre-inscripciones-inscribir';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  seleccionoCarrera: Observable<boolean>;
  // rootPage: any = TodasLasNotasFinalesPage;
  rootPage: any = 'LoginPage';

  activePage: any;
  pages: Array<{ title: string, component: any, icon: string, subitem: boolean, can: boolean }>;
  pages_sin_carrera: Array<{ title: string, component: any, icon: string, subitem: boolean, can: boolean }>;
  public carreraList;
  user: any;
  public carrera;
  facultad: any;
  menuInicializado: boolean = false;
  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen, private auth: AuthService,
    private storage: StorageProvider, public alertCtrl: AlertController,
    public events: Events
  ) {
    this.initializeApp();

    this.pages = [
      { title: 'Todas las notas finales', component: TodasLasNotasFinalesPage, icon: 'md-albums', subitem: false, can: true },
      { title: 'Exámenes parciales', component: ParcialesPage, icon: 'md-document', subitem: false, can: true },
      { title: 'Inscrip a examenes', component: InscripcionExamenPage, icon: 'md-list', subitem: false, can: true },
      { title: 'Inscripciones', component: undefined, icon: 'md-list', subitem: false, can: true },
      { title: 'Pre-inscribir', component: PreInscripcionesInscribirPage, icon: 'md-list', subitem: true, can: true},
      { title: 'Pre-inscrip registradas', component: PreInscripcionesPage, icon: 'md-create', subitem: true, can: true },
      { title: 'Inscrip registradas', component: InscripcionesPage, icon: 'md-done-all', subitem: true, can: true }
    ];
    this.pages_sin_carrera = [
      { title: 'Estado de cuentas', component: CuentasPage, icon: 'md-cash', subitem: false, can: true },
      { title: 'Extensión', component: ExtensionPage, icon: 'md-stopwatch', subitem: false, can: true }
    ];
    this.activePage = this.pages[2];

    events.subscribe('user:logged', (user, time) => {
      this.incialiarzarMenu();
    })
    if(this.menuInicializado == false){ this.incialiarzarMenu() };
  }

  

  incialiarzarMenu() {
    this.menuInicializado = true;
    this.storage.currentMatriculas().subscribe((val) => {
      this.carreraList = JSON.parse(val);
    });

    this.storage.currentUser().subscribe((val) => {
      console.log("valor", val);
      this.user = JSON.parse(val);
    });

    this.storage.currentCarrera().subscribe((val) => {
      this.carrera = JSON.parse(val);
    });

    this.storage.currentFacultad().subscribe((val) => {
      let facultad = JSON.parse(val);
      if (facultad){
        console.log("facultad", facultad);
        this.pages.forEach(function(element){
          if (element.component == ParcialesPage) {
            element.can = facultad.tieneParciales;
          }
          if (element.component == PreInscripcionesPage) {
            element.can = facultad.tienePreinscasig;
          }
          if (element.component == InscripcionExamenPage) {
            console.log("secure", element.can, facultad.tieneInscexafinal);
            element.can = facultad.tieneInscexafinal;
          }
        })
      }
    });
  }

  secureMenu(){
    this.pages.forEach(function(element){
      if (element.component == ParcialesPage && this.facultad.tieneParciales == false) {
        element.can = false;
      }
      if (element.component == PreInscripcionesPage && this.facultad.tienePreinscasig == false) {
        element.can = false;
      }
      if (element.component == InscripcionExamenPage && this.facultad.tieneInscexafinal == false) {
        element.can = false;
      }
    })
  }

  currentUser() {
    this.storage.currentUser().subscribe((val) => {
      this.user = val;
    })
    return JSON.parse(this.user);
  }

  cambiarCarrera(carreraCode) {
    this.storage.saveStateCarrera(carreraCode);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (typeof page.component !== 'undefined' ) {
      this.nav.setRoot(page.component);
      this.activePage = page;
    }
  }

  checkActive(page) {
    return page == this.activePage;
  }

  cerrarSesion() {
    this.auth.logout()
      .subscribe(
        () => {
          this.nav.insert(0, LoginPage),
            this.nav.popToRoot()
        },
        error => {
          console.log("error al cerrar sesion,", error.error)
        }
      )
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Confirmación',
      message: 'Seguro de cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            console.log('Si clicked');
            this.cerrarSesion();
          }
        }
      ]
    });
    confirm.present();
  }
}
