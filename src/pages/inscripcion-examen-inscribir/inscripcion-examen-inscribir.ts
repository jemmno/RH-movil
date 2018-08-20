import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { InscripcionExamenesService } from '../../app/services/inscripcion.examenes.service';
import { AsignaturaHabilitada } from '../../app/models/asigatura.habilitada';
import { LoadingService } from '../../app/services/loading.service';
import { AlertController } from "ionic-angular";
import { ToastController } from "ionic-angular";
import { App } from "ionic-angular";
import { InscripcionExamenPage } from '../inscripcion-examen/inscripcion-examen';

@Component({
  selector: 'inscripcion-examen-inscribir',
  templateUrl: 'inscripcion-examen-inscribir.html',
})
export class InscripcionExamenInscribirPage {

  @ViewChild(Content) content: Content;

  asignaturas: AsignaturaHabilitada[];

  constructor(
    private inscripcionService: InscripcionExamenesService,
    private loading: LoadingService,
    public alertCtrl: AlertController, private toastCtrl: ToastController,
    private app: App
  ) { }

  ngOnInit() {
    this.getInscripciones();
  };

  getInscripciones(): void {
    this.loading.showLoader();
    this.inscripcionService.getAsignaturasHabilitadas()
      .subscribe(
        asignaturas => {
          this.asignaturas = asignaturas,
          this.loading.hideLoader()
        },
        error => {
          console.log("error en el controlador", error);
          this.loading.hideLoader()
        }
      )
  };


  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: "Confirmación",
      message: "Seguro de su inscripción, generará una deuda?",
      buttons: [
        {
          text: "Cancelar",
          handler: () => {
            console.log("No clicked");
          }
        },
        {
          text: "Confirmar",
          handler: () => {
            console.log("Si clicked");
            this.inscribir();
          }
        }
      ]
    });
    confirm.present();
  }

  inscribir() {
    this.loading.showLoader("Cargando Inscripción");
    let examenes = [];
    for (let asignatura of this.asignaturas) {
      if (asignatura.inscribir == true) {
        examenes.push(asignatura);
      }
    }
    console.log("actualizando");
    this.inscripcionService
      .inscribir(examenes)
      .subscribe(
        data => {
          console.log("respuesta server", data), this.loading.hideLoader();
          this.presentToast("Inscripciones cargadas!");
          this.app.getRootNav().setRoot(InscripcionExamenPage);
        },
        error => {
          console.log("######## error #######", error);
          this.loading.hideLoader();
          this.presentToast("No se pudo cargar inscripciones");
        }
      );

    console.log("prueba", examenes);
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
