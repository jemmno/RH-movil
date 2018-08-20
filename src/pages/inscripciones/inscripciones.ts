import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { PreinscripcionService } from '../../app/services/preinscripcion.service';
import { Preinscripcion } from '../../app/models/preinscripcion';
import { LoadingService } from '../../app/services/loading.service';

@Component({
  selector: 'page-inscripciones',
  templateUrl: 'inscripciones.html',
})
export class InscripcionesPage {

  soloAnhoActual: boolean;
  filtro: number;
  public currentYear: number = new Date().getFullYear();

  @ViewChild(Content) content: Content;

  inscripciones: Preinscripcion[];

  constructor(
    private preinscripcionService: PreinscripcionService,
    private loading: LoadingService
  ) {
    this.soloAnhoActual = true;
    this.filtro = this.currentYear;
  }

  ngOnInit() {
    this.getInscripciones();
  };

  getInscripciones(): void {
    this.loading.showLoader();
    this.preinscripcionService.getInscripciones()
      .subscribe(
        inscripciones => {
          this.inscripciones = inscripciones,
            this.loading.hideLoader()
        },
        error => {
          console.log("error en el controlador", error);
          this.loading.hideLoader()
        }
      )
  };

  filtroAnhoActual() {
    this.soloAnhoActual = !this.soloAnhoActual;
    this.filtro = this.soloAnhoActual ? this.currentYear : null;
  }
}
