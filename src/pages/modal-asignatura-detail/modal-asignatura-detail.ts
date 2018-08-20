import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import {
  FormGroup,
  FormControl

} from '@angular/forms';

/**
 * Generated class for the ModalAsignaturaDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-asignatura-detail',
  templateUrl: 'modal-asignatura-detail.html',
})
export class ModalAsignaturaDetailPage {
  asignatura; 
  selection;
  seleccion = '';
  electivas;
  electivasForm;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public params: NavParams,
    public viewCtrl: ViewController,
    public events: Events
  ) {
    // this.electivasForm = new FormGroup({
    //   "electivas": new FormControl({value: '', disabled: false})
    // });
  }

  ionViewWillLoad() {
    this.asignatura = this.params.get('asignatura');
    console.log('ionViewDidLoad ModalAsignaturaDetailPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSelectedTurno(turno_seccion) {
    this.seleccion = turno_seccion;
    console.log("la seleccion", this.seleccion);
  }

  onSelectedTurnoElectiva(electiva) {
    for (let electiva of this.asignatura.electivas) {
        if (electiva != this.asignatura.electivaSelected) {
          electiva.selected = '';
        }
    }
    this.asignatura.name = electiva.asignatura;
    this.seleccion = this.asignatura.electivaSelected;
  }

  confirmar() {
    this.events.publish('turno:seleccionado', this.asignatura, this.seleccion, Date.now());
    this.dismiss();
  }

  cancelar() {
    console.log("cancelar");
  }
}
