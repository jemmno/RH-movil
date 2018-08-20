import {Injectable} from '@angular/core';
import {LoadingController} from 'ionic-angular';

export interface ILoaderParams {
    message?: string;
    time?: number;
    dismissOnPageChange?: boolean
}

/* 
    USO
        let loaderOptions = {
        message:'This is custom message',
        time:3000
        };
   
        we can just call loader with default settings as below 
        this.loader.show({});
        or with some custom settings 
        this.loader.show(loaderOptions);
*/    

@Injectable()
export class LoadingService {

    loader: any = null;
    constructor(public loadingCtrl: LoadingController) {
    }

   /*  show(param: ILoaderParams) {
        this.create(param);
        this.loader.present();
    }

    hide() {
        this.loader.dismiss();
    }

    create(param: ILoaderParams) {
        return this.loader = this.loadingCtrl.create({
            content: param.message || "Cargando...",
            duration: param.time,
            dismissOnPageChange: param.dismissOnPageChange || true
        });
    } */

    private showLoadingHandler(message, dismissOnPageChange?) {
        if (this.loader == null) {
            this.loader = this.loadingCtrl.create({
                content: message,
                dismissOnPageChange: dismissOnPageChange || false

            });
            this.loader.present();
        } else {
            this.loader.data.content = message;
        }
    }

    private hideLoadingHandler() {
        if (this.loader != null) {
            this.loader.dismiss();
            this.loader = null;
        }
    }

    public showLoader(message?) {
        this.showLoadingHandler(message || "Cargando...");
    }

    public hideLoader() {
        setTimeout(this.hideLoadingHandler(), 1000);
    }
}
