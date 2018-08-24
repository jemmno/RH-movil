import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';

/**
 * Generated class for the WellcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wellcome',
  templateUrl: 'wellcome.html',
})
export class WellcomePage {
  public carrera;
  public carreraList;


  constructor(private storage: StorageProvider) {

  }  
}