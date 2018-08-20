import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ExtensionService } from '../../app/services/extension.service';
import { LoadingService } from '../../app/services/loading.service';
import { ExtensionUniversitaria } from '../../app/models/extensionUniversitaria';
import { ModalController } from 'ionic-angular';
import { ModalActividadDetallePage } from '../modal-actividad-detalle/modal-actividad-detalle';

@Component({
  selector: 'extension',
  templateUrl: 'extension.html'
})

export class ExtensionPage {
  extension: ExtensionUniversitaria;
  tipo: string = 'resumen';

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    private loader: LoadingService,
    private extensionService: ExtensionService,
  ) {
/*     this.segment = '2017';
 */  }

  ngOnInit() {
    this.getResumenExtension();
  };

  getResumenExtension(): void {
    this.loader.showLoader();
    this.extensionService.getResumenExtension()
      .subscribe(
        res => {
          this.extension = res,
            this.loader.hideLoader();
        },
        error => {
          console.log("error en el controlador", error);
          this.loader.hideLoader()
        }
      );
  };

  openModal(actividad) {
    console.log("inspect actividad", actividad);
    let modal = this.modalCtrl.create(ModalActividadDetallePage, { actividad: actividad });
    modal.present();
  }

}
