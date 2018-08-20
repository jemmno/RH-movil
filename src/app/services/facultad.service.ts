import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { ToastService } from './toast.service';
import { Facultad } from '../models/facultad';
import { Global } from '../global';
 
@Injectable()
export class FacultadService{
    private facultadesUrl = 'facultades';  // URL to web api
    public url: string;
    
    constructor(
        private http: HttpClient,
        private toastService: ToastService
    ){
        this.url = Global.url;
    }
 
    getFacultades(): Observable<Facultad[]>{
        return this.http.get<Facultad[]>(this.url+this.facultadesUrl)
        .pipe(
            catchError(this.handleError<Facultad[]>('getFacultades')) );
        
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
      console.error("en el servicio obtener facultades", error); // log to console instead
 
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
        this.toastService.create(`Error al obtener facultades, ${message}`);
    }
}