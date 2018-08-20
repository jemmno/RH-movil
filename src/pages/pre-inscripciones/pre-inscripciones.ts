import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { PreinscripcionService } from '../../app/services/preinscripcion.service';
import { Preinscripcion } from '../../app/models/preinscripcion';
import { LoadingService } from '../../app/services/loading.service';

@Component({
  selector: 'page-pre-inscripciones',
  templateUrl: 'pre-inscripciones.html',
})
export class PreInscripcionesPage {

  @ViewChild(Content) content: Content;

  preinscripciones: Preinscripcion[];
  
  constructor(
    private preinscripcionService: PreinscripcionService,
    private loading: LoadingService
  ) {
  }

  ngOnInit() {
    this.getPreinscripciones();
  };
  
  getPreinscripciones(): void {
    this.loading.showLoader();
    this.preinscripcionService.getPreinscripciones()
        .subscribe(
          preinscripciones => {
            this.preinscripciones = preinscripciones,
            this.loading.hideLoader()
          },
          error => {
            console.log("error en el controlador",  error);
            this.loading.hideLoader()
          }
        )
  };
  
}
