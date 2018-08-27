import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import {
  FormGroup,
  FormControl

} from '@angular/forms';

/**
 * Generated class for the ModalAsistenciaDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-asistencia-detail',
  templateUrl: 'modal-asistencia-detail.html',
})
export class ModalAsistenciaDetailPage {
  marcacion; 

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public params: NavParams,
    public viewCtrl: ViewController,
    public events: Events
  ) {
  }

  ionViewWillLoad() {
    this.marcacion = this.params.get('marcacion');
    console.log('ionViewDidLoad ModalAsistenciaDetailPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
