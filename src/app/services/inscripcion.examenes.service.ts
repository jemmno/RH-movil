import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { ToastService } from '../services/toast.service';
import { StorageProvider } from '../../providers/storage/storage';
import { InscripcionExamen } from '../models/incripcion.examen';
import { AsignaturaHabilitada } from '../models/asigatura.habilitada';
import { Global } from '../global';

@Injectable()
export class InscripcionExamenesService {
    private inscripcionesUrl = 'inscexafinal/registradas/';  // URL to web api
    private inscripcionesDisponibleUrl = 'inscexafinal/examenes-habilitados/'
    private inscribirUrl = 'inscexafinal/registrar/'
    public url: string;

    constructor(
        private storage: StorageProvider,
        private toastService: ToastService,
        private http: HttpClient,

    ) {
        this.url = Global.url;
    }

    currentCarrera() {
        let carrera: string;
        this.storage.currentCarrera().subscribe(currentCarrera => {
            carrera = currentCarrera
        })
        return JSON.parse(carrera);
    }

    getInscripcionesExamenes(): Observable<InscripcionExamen[]> {
        return this.http.get<InscripcionExamen[]>(this.url + this.inscripcionesUrl + this.currentCarrera())
            .pipe(
                catchError(this.handleError<InscripcionExamen[]>('getInscripcionesExamenes'))
            );

    }

    getAsignaturasHabilitadas(): Observable<AsignaturaHabilitada[]> {
        return this.http.get<AsignaturaHabilitada[]>(this.url + this.inscripcionesDisponibleUrl + this.currentCarrera())
            .pipe(
                catchError(this.handleError<AsignaturaHabilitada[]>('getAsignaturasHabilitadas'))
            );

    }

    public inscribir(examenes): Observable<any> {
        let Url = `${this.url}${this.inscribirUrl}${this.currentCarrera()}`;
        if (examenes.lenght) {
            return Observable.throw("No se cuenta con la info suficiente de inscripciones");
        } else {
            return this.http.post<any>(Url, examenes);
        }
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
            console.error("en el servicio inscripcion examen service", error); // log to console instead

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
        this.toastService.create(`Error al obtener inscripciones a exámenes, ${message}`);
    }
}