import { DiaLaboral } from '../models/diaLaboral';  

export interface AsistenciaTrabajador {
    diaSemana: number;
    diaSemanaStr: String;
    fecha: Date;
    horaEntrada: Date;
    horaSalida: Date;
    retraso: number;
    salanticipada: number;
    ausente: boolean;
    vacacion: boolean;
    omision: boolean;
    feriado: string;
    horasTrabajadas: number;
    horasNocturnas: number;
    hsTrabAjus: number;
    diaLaboral: DiaLaboral;
}