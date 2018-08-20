import { NgModule } from '@angular/core';
import { ExtensionPage } from './extension';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ExtensionPage)
  ],
})
export class ExtensionPageModule {}