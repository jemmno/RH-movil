import { Component, ViewChild } from '@angular/core';
import { Content, ModalController, Modal } from 'ionic-angular';
import { PreinscripcionService } from '../../app/services/preinscripcion.service';
import { AsignaturasHabilitadasInscripcion } from '../../app/models/asignaturas.habilitadas.inscripcion';
import { LoadingService } from '../../app/services/loading.service';
import { AlertController, ToastController, Events } from "ionic-angular";
import { App } from "ionic-angular";
import { ModalAsignaturaDetailPage } from '../modal-asignatura-detail/modal-asignatura-detail';
 
@Component({
  selector: 'pre-inscripciones-inscribir',
  templateUrl: 'pre-inscripciones-inscribir.html',
})
export class PreInscripcionesInscribirPage {

  @ViewChild(Content) content: Content;

  asignaturas: AsignaturasHabilitadasInscripcion;

  constructor(
    private preinscripcionService: PreinscripcionService,
    private loading: LoadingService, private modalCtrl: ModalController,
    public alertCtrl: AlertController, private toastCtrl: ToastController,
    private app: App, public events: Events

  ) { 
    events.subscribe('turno:seleccionado', (asignatura, seleccion, time) => {
      console.log("selecciono turno de ", seleccion);
      this.cargarSeleccionTurnoAsignatura(asignatura, seleccion);
    })
  }

  cargarSeleccionTurnoAsignatura(asignatura, seleccion){
    let inscripciones = [];
    for (let currentAsignatura of this.asignaturas.data) {
      if (currentAsignatura == asignatura) {
        console.log("son iguales? ", currentAsignatura, asignatura);
        inscripciones.push(seleccion);
        currentAsignatura.checked = true;
        currentAsignatura.seccion = seleccion.seccion;
        currentAsignatura.turno = seleccion.turno;
      }
    }
  }
  
  openModal(asignatura) {
    let modal = this.modalCtrl.create(ModalAsignaturaDetailPage, { asignatura: asignatura});
    modal.present();
  }

  ngOnInit() {
    this.getInscripciones();
  };

  getInscripciones(): void {
    this.loading.showLoader();
    this.preinscripcionService.getAsignaturasHabilitadas()
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
    // for (let asignatura of this.asignaturas) {
    //   if (asignatura.inscribir == true) {
    //     examenes.push(asignatura);
    //   }
    // }
    // console.log("actualizando");
    // this.preinscripcionService
    //   .inscribir(examenes)
    //   .subscribe(
    //     data => {
    //       console.log("respuesta server", data), this.loading.hideLoader();
    //       this.presentToast("Inscripciones cargadas!");
    //       this.app.getRootNav().setRoot(InscripcionExamenPage);
    //     },
    //     error => {
    //       console.log("######## error #######", error);
    //       this.loading.hideLoader();
    //       this.presentToast("No se pudo cargar inscripciones");
    //     }
    //   );

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
