import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { InscripcionExamenesService } from '../../app/services/inscripcion.examenes.service';
import { InscripcionExamen } from '../../app/models/incripcion.examen';
import { LoadingService } from '../../app/services/loading.service';

@Component({
  selector: 'inscripcion-examen-confirmado',
  templateUrl: 'inscripcion-examen-confirmado.html',
})
export class InscripcionExamenConfirmadoPage {

  @ViewChild(Content) content: Content;

  inscripciones: InscripcionExamen[];
  
  constructor(
    private inscripcionService: InscripcionExamenesService,
    private loading: LoadingService
  ) {}

  ngOnInit() {
    this.getInscripciones();
  };
  
  getInscripciones(): void {
    this.loading.showLoader();
    this.inscripcionService.getInscripcionesExamenes()
        .subscribe(
          inscripciones => {
            this.inscripciones = inscripciones,
            this.loading.hideLoader()
          },
          error => {
            console.log("error en el controlador",  error);
            this.loading.hideLoader()
          }
        )
    };
  
}
