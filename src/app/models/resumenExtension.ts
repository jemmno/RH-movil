import { Extension } from '../models/extension';

export interface ResumenExtension {
    horasRequeridas: number;
    horasAjustadas: number;
    horasCumplidas: number;
    minactreq: number;
    activcount: number;
    creds_completo: string;
    extensionList: Extension[];
}
