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



  //  private cacheUser = window.localStorage.getItem("user-data") || "{}";
  // private cacheCarrera = window.localStorage.getItem("carrera-data") || "{}";
  // private cacheMatriculas = window.localStorage.getItem("matriculas-data") || "[]";
  
  public user;
  
  // public carrera;
  // public matriculas;
  
  // constructor() {
  //   this.user = JSON.parse(this.cacheUser);
  //   this.carrera = JSON.parse(this.cacheCarrera); 
  //   this.matriculas = JSON.parse(this.cacheMatriculas);
  // }

  public saveStateUser(user, credentials){
    user.logged = true;
    user.credentials = credentials;
    //user.credentials.facultad = credentials.facultad.codigo;
    return this.setItem('user-data', JSON.stringify(user));
  }

  public saveStateFacultad(facultad) {
    return this.setItem('facultad-data', JSON.stringify(facultad));
  }

  public saveStateMatriculas(matriculas){
    return this.setItem('matriculas-data', JSON.stringify(matriculas));
  }

  public saveStateCarrera(carreraCode){
    return this.setItem("carrera-data", JSON.stringify(carreraCode));
  }

  public currentUser() {
    return this.getItem("user-data");
  }
  
  public currentCarrera() {
    return this.getItem("carrera-data");
  }

  public currentMatriculas() {
    return this.getItem("matriculas-data");
  }

  public currentFacultad() {
    return this.getItem("facultad-data");
  }

  public clean(){
   this.clear();
  }

}
