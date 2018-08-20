import { NgModule } from '@angular/core';
import { ParcialesPage } from './parciales';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ParcialesPage),
  ],
})
export class ParcialesPageModule {}