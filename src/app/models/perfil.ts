import { HorarioFijo } from './horarioFijo';  

export interface Perfil {
    id: number;
    codMarcacion: string;
    nrodoc: string;
    nombres: string;
    apellidos: string;
    areaTrabajo: string;
    profesion: string;
    cargo: string;
    ciudad: string;
    direccion: string;
    celular: string;
    telefono: string;
    estadoCivil: string;
    fechaNac: string;
    fechaIngreso: string;
    antiguedad: string;
    edad: number;
    horariosFijos: HorarioFijo[];
}