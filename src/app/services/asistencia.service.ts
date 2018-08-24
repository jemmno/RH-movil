import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { ToastService } from './toast.service';
import { StorageProvider } from '../../providers/storage/storage'
import { Global } from '../global';
import { AsistenciaTrabajador } from '../models/asistenciaTrabajador';

@Injectable()
export class AsistenciaService{
    private asistenciasUrl = 'mi-sesion/asistencias';  // URL to web api
    public url: string;
    
    constructor(
        private toastService: ToastService,
        private storage: StorageProvider,
        private http: HttpClient
    ){
        this.url = Global.url;
     }
 
    
    getAsistencias(rangoDeFechas): Observable<AsistenciaTrabajador>{
        if (rangoDeFechas.desde === null || rangoDeFechas.hasta === null) {
            return Observable.throw("Por favor ingrese sus credenciales");
        } else {
            return this.http.get<AsistenciaTrabajador>(`${this.url}${this.asistenciasUrl}?fechaDesde=${rangoDeFechas.desde}&fechaHasta=${rangoDeFechas.hasta}`)
            .pipe(
                catchError(this.handleError<AsistenciaTrabajador>('getParciales')) 
            );
        }
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
      console.error("obteniendo asistencias", error); // log to console instead
 
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
        this.toastService.create(`Error al obtener asistencias , ${message}`);
    }
}