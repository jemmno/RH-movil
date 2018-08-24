import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Session } from '../../app/models/session';
import { StorageProvider } from '../../providers/storage/storage';
import { ToastService } from '../../app/services/toast.service';

import { Global } from '../../app/global';
import {HttpClient} from '@angular/common/http';
import { catchError, tap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';

 
@Injectable()
export class AuthService {
  currentSession: Session;
  private loginUrl = 'login';  // URL to web api
  private logoutUrl = 'logout';
  public url: string;
  public user: any;
  
  constructor(
    private http: HttpClient,
    private storage: StorageProvider,
    private toastService: ToastService
  ){
    this.storage.currentUser().subscribe((val) => {
      this.user = val;
    })
    this.url = Global.url;
    //this.user = storage.currentUser();
    //this.carrera = storage.currentCarrera();
  }

 
  public login(credentials): Observable<Session>  {
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Por favor ingrese sus credenciales");
    } else {
      console.log("credenciales", credentials);
      const url = `${this.url}${this.loginUrl}`;
      let formData: FormData = new FormData(); 
      formData.append('username', credentials.username);
      formData.append('password', credentials.password); 
      return this.http.post<Session>(url, formData)
      .pipe(
          catchError(this.handleError<Session>('login'))
      );
    }
  }

  public isLogged() : boolean{
    return (!!this.user || false);
  }

   currentUser() {
    const user$  = this.storage.currentUser().map(x => JSON.parse(x));
    user$.subscribe(u => this.user = u)
    return user$
  }
  
  public logout(): Observable<any> {
    const ourl = this.url + this.logoutUrl;
    console.log("cerrando sesion", this.user);
    return this.http.post(ourl,'')
    .pipe(
      tap(() => {
        this.storage.clean()
      }),
      catchError(this.handleError('cerrar sesión'))
    );
  
  }

  public reauthenticate(): Observable<Session> {
    return this.currentUser()
    .pipe(
      tap(console.log),
      mergeMap(x => this.login(x.credentials)),
    )
    
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
      console.error("auth-service", error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      if (error.error) {
        this.log(error.error);
      } else {
        this.log(`Verifique sus credenciales`);
      }
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }

    /** Log a Service message with the MessageService */
    private log(message: string) {
        this.toastService.create(`Error en el servicio de autenticación, ${message}`);
    }
}