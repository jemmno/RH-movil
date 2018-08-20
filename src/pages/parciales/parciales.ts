import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { ParcialService } from '../../app/services/parcial.service';
import { LoadingService } from '../../app/services/loading.service';
import { Parcial } from '../../app/models/parcial';

@Component({
  selector: 'parciales',
  templateUrl: 'parciales.html'
})
export class ParcialesPage {

  @ViewChild(Content) content: Content;

  parciales: Parcial[];
  shownGroup = null;
  segment: string;
  order: string = 'name';

  constructor(
    public navCtrl: NavController,
    private loader: LoadingService,
    private parcialService: ParcialService,
  ) {
/*     this.segment = '2017';
 */  }

  ngOnInit() {
    this.getParciales();
  };

  ionViewDidLoad() {
    this.content.resize();
  }

  getParciales(): void {
    this.loader.showLoader();
    this.parcialService.parcialesDeEsteAnho()
      .subscribe(
        parciales => {
          this.parciales = parciales,
          this.loader.hideLoader()
        },
        error => {
          console.log("error en el controlador",  error);
          this.loader.hideLoader()
        }
      );

  };

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };

  isGroupShown(group) {
    return this.shownGroup === group;
  };
}
