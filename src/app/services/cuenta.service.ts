import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import {ToastService } from './toast.service';
import { Cuenta } from '../models/cuenta';
import { Global } from '../global';
 
@Injectable()
export class CuentaService{
    private cuentasUrl = 'deudas';  // URL to web api
    public url: string;
    
    constructor(
        private toastService: ToastService,
        private http: HttpClient
    ){
        this.url = Global.url;
    }
 
    getCuentas(): Observable<Cuenta[]>{
        return this.http.get<Cuenta[]>(this.url+this.cuentasUrl)
        .pipe(
            catchError(this.handleError<Cuenta[]>('getCuentas')) );
        
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
      console.error("en el servicio obtener cuentas", error); // log to console instead
 
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
        this.toastService.create(`Error al obtener estado de cuentas, ${message}`);
    }
}