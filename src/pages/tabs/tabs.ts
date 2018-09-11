import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { SalarioPage } from '../salario/salario';
import { AsistenciasPage } from '../asistencias/asistencias';
import { PerfilPage } from '../perfil/perfil';
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  asistencias: any = AsistenciasPage;
  salario: any = SalarioPage;
  perfil: any = PerfilPage;

  myIndex: number;
 
  constructor(navParams: NavParams) {
    // Set the active tab based on the passed index from menu.ts
    this.myIndex = navParams.data.tabIndex || 0;
  }

}
