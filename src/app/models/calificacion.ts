import { Nota } from '../models/nota';

export interface Calificacion {
    notas: Nota[];
    promedio:number;
}
