import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { LoadingService } from '../../app/services/loading.service';
import { AsistenciaService } from '../../app/services/asistencia.service';
import { Asistencia } from '../../app/models/asistencia';
import { ModalAsistenciaDetailPage } from '../modal-asistencia-detail/modal-asistencia-detail';
import * as moment from 'moment';

/**
 * Generated class for the AsistenciasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-asistencias',
  templateUrl: 'asistencias.html',
})
export class AsistenciasPage {
  filtro = { desde: '', hasta: ''};
  
  asistencias: Asistencia;
  //rangoDeFechas = { desde: '15/07/2018', hasta: '16/08/2018' };
  rangoDeFechas = { desde: '', hasta: '' };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loader: LoadingService,
    private asistenciaService: AsistenciaService,
    public modalCtrl: ModalController,

  ) {
    this.rangoDeFechas.hasta = moment().format('DD/MM/YYYY')
    this.rangoDeFechas.desde = moment().subtract(1, 'months').format('DD/MM/YYYY');
    this.filtro.desde = moment().subtract(1, 'months').format();
    this.filtro.hasta = moment().format();
  }

  ionViewDidLoad() {
    this.getAsistencias();
    console.log("fechas", this.rangoDeFechas);
  }

  getAsistencias() {
    this.loader.showLoader();
    this.asistenciaService.getAsistencias(this.rangoDeFechas)
      .subscribe(
        res => {
          this.asistencias = res,
          this.loader.hideLoader();
        },
        error => {
          console.log("error en el controlador", error);
          this.loader.hideLoader()
        }
      );
  }

  openModal(marcacion){
    console.log(marcacion);
    let modal = this.modalCtrl.create(ModalAsistenciaDetailPage, { marcacion: marcacion });
    modal.present();
  }

  filtrar(){
    console.log("filtrando");
    this.rangoDeFechas.desde = moment(this.filtro.desde).format('DD/MM/YYYY');
    this.rangoDeFechas.hasta = moment(this.filtro.hasta).format('DD/MM/YYYY');
    this.getAsistencias();
  }

}
