import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { ToastService } from './toast.service';
import { StorageProvider } from '../../providers/storage/storage'
import { Global } from '../global';
import { Periodo } from '../models/periodo';
import { Salario } from '../models/salario';
import { of } from 'rxjs/observable/of';

@Injectable()
export class SalarioService {
    private periodosUrl = 'mi-sesion/periodosrh';  // URL to web api
    private salarioUrl = 'mi-sesion/salario';
    public url: string;

    constructor(
        private toastService: ToastService,
        private storage: StorageProvider,
        private http: HttpClient
    ) {
        this.url = Global.url;
    }


    getPeriodos(): Observable<Periodo[]> {
        return this.http.get<Periodo[]>(`${this.url}${this.periodosUrl}`)
            .pipe(
                catchError(this.handleError<Periodo[]>('getPeriodos'))
            );

    }

    getSalario(periodoRH): Observable<Salario[]> {
        return this.http.get<Salario[]>(`${this.url}${this.salarioUrl}?periodoRhId=${periodoRH}`)
            .pipe(
                catchError(this.handleError<Salario[]>('getSalario'))
            );
    }

   /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error("en el servicio obtener salarios", error); // log to console instead

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