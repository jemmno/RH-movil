import { AsignaturaHabilitadaInscripcion } from "./asignatura.habilitada.inscripcion";

export interface AsignaturasHabilitadasInscripcion {
    success: boolean;
    errorMessage: string;
    successMessage: string;
    data: AsignaturaHabilitadaInscripcion[];
}