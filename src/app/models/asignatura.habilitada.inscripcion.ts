import { turnoSeccion } from "./turno.seccion";

export interface AsignaturaHabilitadaInscripcion {
    checked: boolean;
    anho: number;
    codcarsec: string;
    codasign: string;
    convocatoria: number;
    asignatura: string;
    codcurso: number;
    conFirma: boolean;
    electiva: boolean;
    inscasig: boolean;
    semestre: number;
    idascursec: number;
    turnoSeccionList: turnoSeccion[];
    turno: string;
    seccion: string;
    electivaSelected: string;
}