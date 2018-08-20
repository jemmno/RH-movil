import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { ToastService } from './toast.service';
import { StorageProvider } from '../../providers/storage/storage'
import { Parcial } from '../models/parcial';
import { Global } from '../global';
 
@Injectable()
export class ParcialService{
    private parcialesUrl = 'notas_parciales/';  // URL to web api
    public url: string;
    public year: number = new Date().getFullYear();
    private segment: number;

    constructor(
        private toastService: ToastService,
        private storage: StorageProvider,
        private http: HttpClient
    ){
        this.url = Global.url;
        var currentdate = new Date(); 
        this.segment = currentdate.getFullYear();
     }
 
    currentCarrera(){
        let carrera: string;
        this.storage.currentCarrera().subscribe( currentCarrera => {
            carrera = currentCarrera
        })
        return JSON.parse(carrera);
    }

    getParciales(): Observable<Parcial[]>{
        return this.http.get<Parcial[]>(this.url+this.parcialesUrl + this.currentCarrera())
        .pipe(
            catchError(this.handleError<Parcial[]>('getParciales')) );
        
    } 

    parcialesDeEsteAnho(){
        return this.getParciales()
        .pipe(
            catchError(this.handleError<Parcial[]>('getParcialesDeEsteAnho')) )
        .map(parciales => parciales.filter(parcial => parcial.anho == this.segment ));
    }

      /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error("en el servicio parciales service", error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      if (error.error) {
        this.log(error.error);
      } else {
        this.log(`${operation} failed: ${error.message}`);
      }
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }

    /** Log a Service message with the MessageService */
    private log(message: string) {
        this.toastService.create(`Error al obtener parciales , ${message}`);
    }
}