import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SalarioService } from '../../app/services/salario.service';
import { LoadingService } from '../../app/services/loading.service';
import { Periodo } from '../../app/models/periodo';
/**
 * Generated class for the SalarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-salario',
  templateUrl: 'salario.html',
})
export class SalarioPage {
  periodos: Periodo[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private salarioService: SalarioService, public loader: LoadingService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalarioPage');
    this.getPeriodos();
  }

  getPeriodos() {
    this.loader.showLoader();
    this.salarioService.getPeriodos()
      .subscribe(
        res => {
          this.periodos = res,
          this.loader.hideLoader();
        },
        error => {
          console.log("error en el controlador", error);
          this.loader.hideLoader()
        }
      );
  }

  periodoSelected(periodo){
    console.log("periodo", periodo);
  }

}
