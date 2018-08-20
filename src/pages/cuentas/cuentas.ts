import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { CuentaService } from '../../app/services/cuenta.service';
import { LoadingService } from '../../app/services/loading.service';
import { Cuenta } from '../../app/models/cuenta';

@Component({
  selector: 'cuentas',
  templateUrl: 'cuentas.html'
})
export class CuentasPage {

  @ViewChild(Content) content: Content;

  total: number;
  cuentasPendientes: Cuenta[];
  cuentas: Cuenta[];
  shownGroup = null;
  segment: string;
  order: string = 'name';
  tipo: string = 'pendientes';

  constructor(
    public navCtrl: NavController,
    private loader: LoadingService,
    private cuentaService: CuentaService,
  ) {
    this.segment = new Date().getFullYear().toString();
  }

  ngOnInit() {
    this.getCuentas();
  };

  pendientes() {
    this.cuentasPendientes = this.cuentas.filter(cuenta => cuenta.saldo > 0 && !cuenta.tieneBeca);
  };

  ionViewDidLoad() {
    this.content.resize();
  };

  getCuentas(): void {
    this.loader.showLoader();
    this.cuentaService.getCuentas()
      .subscribe(
        res => {
          this.cuentas = res,
          this.loader.hideLoader();
        },
        error => {
          console.log("error en el controlador", error);
          this.loader.hideLoader()
        },
        () => this.pendientes()
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
