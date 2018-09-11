import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { TabsPage } from '../tabs/tabs';
import { LoadingService } from '../../app/services/loading.service';
import { Session } from '../../app/models/session';
import { StorageProvider } from '../../providers/storage/storage';
import { Events } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  session: Session;
  loading: Loading;
  registerCredentials = { username: '', password: '' };

  constructor(private nav: NavController, private auth: AuthService, 
    private loader: LoadingService,
    private alertCtrl: AlertController, 
    private storage: StorageProvider,
    public events: Events
  ) { }

    public login() {
      this.loader.showLoader();
      this.auth.login(this.registerCredentials)
      .subscribe(session => {
        this.session = session;       
        if (this.session) {
          this.storage.saveStateUser(this.session.user, this.registerCredentials);
          this.loader.hideLoader();        
          this.nav.setRoot(TabsPage);
          this.events.publish('user:logged', this.session.user, Date.now());
        } else {
          this.loader.hideLoader();
        }
      },
        error => {
          this.showError(error);
        });
    }
   
     
    showError(text) {
      this.loader.hideLoader();
   
      let alert = this.alertCtrl.create({
        title: 'Fallo',
        subTitle: text,
        buttons: ['OK']
      });
      alert.present(alert);
    }

    ionViewCanEnter() {

      console.log("logueado ???", this.auth.isLogged());

      if (this.auth.isLogged() ) {
        this.nav.setRoot(TabsPage);
      }
    }
}
