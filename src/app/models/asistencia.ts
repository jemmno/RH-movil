import { AsistenciaTrabajador } from '../models/asistenciaTrabajador';

export interface Asistencia {
    cantAusencias: number;
    cantRetrasos: number;
    cantOmisiones: number;
    cantAsistencias: number;
    cantHorasTrabajadas: number;
    cantHsNocturnas: number
    cantHsTrabAjus: number;
    asistenciasTrabajador: AsistenciaTrabajador[];
    observacion: string;
    date: Date;
    marcSinProcesar: Date[];
}