import { NgModule } from '@angular/core';
import { CuentasPage } from './cuentas';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(CuentasPage),
  ],
})
export class CuentasPageModule {}