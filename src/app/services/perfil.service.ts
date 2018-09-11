import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { ToastService } from './toast.service';
import { Global } from '../global';
import { Perfil } from '../models/perfil';

@Injectable()
export class PerfilService {
    private perfilUrl = 'mi-sesion/mi-perfil';  // URL to web api
    public url: string;

    constructor(
        private toastService: ToastService,
        private http: HttpClient
    ) {
        this.url = Global.url;
    }


    getPerfil(): Observable<Perfil> {
        return this.http.get<Perfil>(`${this.url}${this.perfilUrl}`)
            .pipe(
                catchError(this.handleError<Perfil>('getPerfil'))
            );

    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error("obteniendo perfil", error); // log to console instead

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
        this.toastService.create(`Error al obtener perfil , ${message}`);
    }
}