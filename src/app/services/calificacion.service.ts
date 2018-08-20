import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { ToastService } from '../services/toast.service';
import { StorageProvider } from '../../providers/storage/storage';
import { Calificacion } from '../models/calificacion';
import { Global } from '../global';
 
@Injectable()
export class CalificacionService{
    private calificacionesUrl = 'notas_finales/';  // URL to web api
    public url: string;
    
    constructor(
        private storage: StorageProvider,
        private toastService: ToastService,
        private http: HttpClient,

    ){
        this.url = Global.url;
    }
 
    currentCarrera(){
        let carrera: string;
        this.storage.currentCarrera().subscribe( currentCarrera => {
            carrera = currentCarrera
        })
        return JSON.parse(carrera);
    }
    getCalificaciones(): Observable<Calificacion>{
        return this.http.get<Calificacion>(this.url+this.calificacionesUrl + this.currentCarrera())
        .pipe(
            catchError(this.handleError<Calificacion>('getCalificaciones'))
        );
        
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
      console.error("en el servicio calificacion service", error); // log to console instead
 
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
        this.toastService.create(`Error al obtener calificaciones , ${message}`);
    }
}