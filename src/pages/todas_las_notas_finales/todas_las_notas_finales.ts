import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { CalificacionService } from '../../app/services/calificacion.service';
import { Calificacion } from '../../app/models/calificacion';
import { LoadingService } from '../../app/services/loading.service';

@Component({
  selector: 'todas-las-notas-finales',
  templateUrl: 'todas_las_notas_finales.html'
})
export class TodasLasNotasFinalesPage {

  @ViewChild(Content) content: Content;

  calificaciones: Calificacion;
  shownGroup = null;
  segment: number;
  order: string = 'name';
  
  constructor(
    public navCtrl: NavController, 
    private calificacionService: CalificacionService,
    private loading: LoadingService
  ) {
    var currentdate = new Date(); 
    this.segment = currentdate.getFullYear();
  }

  ngOnInit() {
    this.getCalificaciones();
  };
  
  ionViewDidLoad() {
   // this.content.resize();
  }

  getCalificaciones(): void {
    this.loading.showLoader();
    this.calificacionService.getCalificaciones()
        .subscribe(
          calificaciones => {
            this.calificaciones = calificaciones,
            this.loading.hideLoader()
          },
          error => {
            console.log("error en el controlador",  error);
            this.loading.hideLoader()
          }
        )
    };
  
  
  isObjectEmpty = function(notas){
    return Object.keys(notas).length === 0;
 }
}
