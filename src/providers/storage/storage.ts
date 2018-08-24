import { Injectable } from '@angular/core';
import StorageService from './storage.service';

/*
  Generated class for the StorageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider extends StorageService{

  private _storage = localStorage;

	constructor() {
    super();
  }

	protected get storage(): Storage {
		return this._storage;
  }

  
  public user;

  public saveStateUser(user, credentials){
    user.logged = true;
    user.credentials = credentials;
    //user.credentials.facultad = credentials.facultad.codigo;
    return this.setItem('user-data', JSON.stringify(user));
  }

  public currentUser() {
    return this.getItem("user-data");
  }
  
  public clean(){
   this.clear();
  }

}
