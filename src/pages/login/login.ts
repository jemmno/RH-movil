import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { FacultadService} from '../../app/services/facultad.service'
import { WellcomePage } from '../wellcome/wellcome';
import { Facultad } from '../../app/models/facultad';
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
  registerCredentials = { username: '', password: '', facultad: {} };
  facultades: Facultad[];

  constructor(private nav: NavController, private auth: AuthService, 
    private facultadService: FacultadService, private loader: LoadingService,
    private alertCtrl: AlertController, private storage: StorageProvider,
    public events: Events
  ) { }

    public login() {
      console.log("facultad elegida en el login", this.registerCredentials.facultad);
      this.loader.showLoader();
      this.auth.login(this.registerCredentials)
      .do(s => this.session = s)
      .flatMap(() => this.auth.getMatriculas())
      .subscribe(() => {         
        if (this.session) {
          this.auth.getMatriculas();
          this.storage.saveStateFacultad(this.registerCredentials.facultad);
          this.storage.saveStateUser(this.session.user, this.registerCredentials);
          this.loader.hideLoader();        
          this.nav.setRoot(WellcomePage);
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
        this.nav.setRoot(WellcomePage);
      } else {
        this.loader.showLoader();

        this.facultadService.getFacultades()
        .subscribe(
          facultades => {
            this.facultades = facultades;
            this.loader.hideLoader();
          }
        );
        

      }
    }
}
