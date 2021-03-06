import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SalarioService } from '../../app/services/salario.service';
import { LoadingService } from '../../app/services/loading.service';
import { Periodo } from '../../app/models/periodo';
import { Salario } from '../../app/models/salario';
import * as moment from 'moment';

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
  salarios: Salario[];
  totalNeto: number = 0;
  totalCredito: number = 0;
  totalDebito: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private salarioService: SalarioService, public loader: LoadingService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalarioPage');
    this.getPeriodos();
    this.getSalario();
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

  getSalario(periodoRhId = '') {
    this.loader.showLoader();
    this.salarioService.getSalario(periodoRhId)
      .subscribe(
        res => {
          this.salarios = res,
          this.totalCredito =   this.salarios.filter((item) =>item.credito)
          .map((item) => +item.credito)
          .reduce((sum, current) => sum + current, 0);
          this.totalDebito=   this.salarios.filter((item) =>item.debito)
          .map((item) => +item.debito)
          .reduce((sum, current) => sum + current, 0);
          this.totalNeto = this.totalCredito - this.totalDebito;
          this.loader.hideLoader();
        },
        error => {
          console.log("error en el controlador", error);
          this.loader.hideLoader()
        }
      );
  }

  periodoSelected($event){
    let periodo = $event;
    console.log("periodo", periodo);
    this.getSalario(periodo);
  }

  getMonthName(monthNumber){
    return moment(monthNumber, 'M').locale('es').format('MMMM');
  }

}
