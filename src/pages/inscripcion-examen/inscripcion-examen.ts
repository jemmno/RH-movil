import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { InscripcionExamenConfirmadoPage } from "../inscripcion-examen-confirmado/inscripcion-examen-confirmado";
import { InscripcionExamenInscribirPage } from '../inscripcion-examen-inscribir/inscripcion-examen-inscribir';

@IonicPage()
@Component({
  selector: 'inscripcion-examen-tabs',
  templateUrl: 'inscripcion-examen.html',
})

export class InscripcionExamenPage {
  constructor(
  ){}

  confirmados: any = InscripcionExamenConfirmadoPage;
  inscribir: any = InscripcionExamenInscribirPage;
}
