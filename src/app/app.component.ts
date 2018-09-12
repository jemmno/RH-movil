import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AlertController } from 'ionic-angular';

import { AuthService } from '../providers/auth-service/auth-service';
import { LoginPage } from '../pages/login/login';
import { StorageProvider } from '../providers/storage/storage';
import { Events } from 'ionic-angular';

import { AsistenciasPage } from '../pages/asistencias/asistencias';
import { PerfilPage } from '../pages/perfil/perfil';
import { SalarioPage } from '../pages/salario/salario';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = 'LoginPage';

  activePage: any;
  pages: Array<{ title: string, component: any, icon: string, subitem: boolean }>;
  user: any;

  menuInicializado: boolean = false;
  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen, private auth: AuthService,
    private storage: StorageProvider, public alertCtrl: AlertController,
    public events: Events
  ) {
    this.initializeApp();

    // this.pages = [
    //   { title: 'Asistencias', component: AsistenciasPage, icon: 'md-albums', subitem: false },
    //   { title: 'Salario', component: SalarioPage, icon: 'md-cash', subitem: false },
    //   { title: 'Mi perfil', component: PerfilPage, icon: 'md-contact', subitem: false },
    // ];
    // this.activePage = this.pages[2];

    events.subscribe('user:logged', (user, time) => {
      this.incialiarzarMenu();
    })
    if(this.menuInicializado == false){ this.incialiarzarMenu() };
  }

  

  incialiarzarMenu() {
    this.menuInicializado = true;

    this.storage.currentUser().subscribe((val) => {
      console.log("valor", val);
      this.user = JSON.parse(val);
    });
  }

  currentUser() {
    this.storage.currentUser().subscribe((val) => {
      this.user = val;
    })
    return JSON.parse(this.user);
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
