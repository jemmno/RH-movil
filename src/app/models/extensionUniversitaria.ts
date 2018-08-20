import { ResumenExtension } from '../models/resumenExtension';
import { ResumenExtensionPorTipoEvento } from '../models/resumenExtensionPorTipoEvento';

export interface ExtensionUniversitaria {
    resumenExtension: ResumenExtension;
    resumenExtensionPorTipoEvento: ResumenExtensionPorTipoEvento[];
}
