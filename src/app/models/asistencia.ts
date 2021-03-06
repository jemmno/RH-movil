import { AsistenciaTrabajador } from '../models/asistenciaTrabajador';

export interface Asistencia {
    cantAusencias: number;
    cantRetrasos: number;
    cantOmisiones: number;
    cantAsistencias: number;
    cantHorasTrabajadas: number;
    cantHsNocturnas: number
    cantHsTrabAjus: number;
    asisTrabajadorList: AsistenciaTrabajador[];
    observacion: string;
    date: Date;
    marcSinProcesar: Date[];
}