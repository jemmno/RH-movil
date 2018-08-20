import { Component } from '@angular/core';
import { IonicPage, NavParams, Platform, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalActividadDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-actividad-detalle',
  templateUrl: 'modal-actividad-detalle.html',
})
export class ModalActividadDetallePage {

  actividad;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
   

  }

  ionViewWillLoad() {
    this.actividad = this.params.get('actividad');
    console.log("dentro del modal actividad", this.actividad);
  };

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
