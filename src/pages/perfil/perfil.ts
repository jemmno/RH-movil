import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PerfilService } from '../../app/services/perfil.service';
import { Perfil } from '../../app/models/perfil';
import { LoadingService } from '../../app/services/loading.service';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  perfil: Perfil;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private perfilService: PerfilService, private loader: LoadingService) {
  }

  ionViewDidLoad() {
    this.getPerfil();
  }

  getPerfil() {
    this.loader.showLoader();
    this.perfilService.getPerfil()
      .subscribe(
        res => {
          this.perfil = res,
          this.loader.hideLoader();
        },
        error => {
          console.log("error en el controlador", error);
          this.loader.hideLoader()
        }
      );
  }

}
