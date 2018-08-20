import { NgModule } from '@angular/core';
import { TodasLasNotasFinalesPage } from './todas_las_notas_finales';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(TodasLasNotasFinalesPage),
  ],
})
export class TodasLasNotasFinalesPageModule {}