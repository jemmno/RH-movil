import { Injectable, Injector } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
  HttpErrorResponse,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { LoginPage } from "../pages/login/login";
import { WellcomePage } from "../pages/wellcome/wellcome";
import { App } from "ionic-angular";
import { AuthService } from "../providers/auth-service/auth-service";
import { LoadingService } from './services/loading.service';
import { StorageProvider } from '../providers/storage/storage';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  intentos: number = 0;
  constructor(private app: App, private injector: Injector, 
    private loader: LoadingService, private storage: StorageProvider
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
    | HttpEvent<any>
  > {
    
    
    request = request.clone({
      withCredentials: true
    });

    return next.handle(request).catch(error => {
      if ((error instanceof HttpErrorResponse)) {
        console.log("tipo de error en el interceptor", (<HttpErrorResponse>error).status);
        switch ((<HttpErrorResponse>error).status) {
          case 400:
            return this.handle400Error();
          case 401:
            return this.handle401Error();
          case 409:
            return this.handle409Error();
          case 0:
            return this.handleNoServerConnection(); 
          case 500:
            return this.handle500Error(); 
        }
      } else {
        return Observable.throw(error);
      }
    });
  }
  
  currentUser() {
    let user: any;
    this.storage.currentUser().subscribe((val) => {
      user = val;
    })
    return JSON.parse(user);
  }

  handleNoServerConnection() {
    //console.log("sin conexion",!navigator.onLine);
    console.log("sin conexión en el interceptor");
    return Observable.throw(new HttpErrorResponse({ error: 'Verifique su conexión e intente de nuevo.' }));
  }

  handle400Error() {
    //return this.logoutUser();
    if(this.currentUser().logged !== undefined){
        return this.reauthenticateUser();
    }   
  }

  handle401Error() {
    //return this.logoutUser();
    console.log("error 401 en interceptor", this.currentUser().logged   );
    if( this.currentUser().logged  !== undefined && this.intentos == 0){
      console.log("tiene user en el localstorage", this.currentUser(), "intento", this.intentos);
      return this.reauthenticateUser();
    }else{
      this.logoutUser();
    }
    return Observable.throw("");

  }

  handle409Error(){
    return  this.logoutUser();
  }

  handle500Error() {
    console.error("error 500");
    return Observable.throw(new HttpErrorResponse({ error: 'Problemas en el servidor.' }));
  }

  logoutUser() {
    let authenticationService = this.injector.get(AuthService);
    
    authenticationService.logout().subscribe(
      () => this.app.getRootNav().push(LoginPage)
    )
    return Observable.throw("");
  }

  reauthenticateUser() {
    this.loader.showLoader("Reautenticando");
    let authenticationService = this.injector.get(AuthService);
    authenticationService.reauthenticate()
    .subscribe( () =>  {
        this.loader.hideLoader(), 
        this.intentos = 0;
        this.app.getRootNav().setRoot(WellcomePage);
      },
      error => {
        console.log("######## error  en reautenticar #######",error);
        this.intentos = 1;
        this.loader.hideLoader(), this.logoutUser();
      });
    return Observable.throw("");
  }
}
