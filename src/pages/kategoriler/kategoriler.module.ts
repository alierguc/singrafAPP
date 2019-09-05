import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KategorilerPage } from './kategoriler';

@NgModule({
  declarations: [
    KategorilerPage,
  ],
  imports: [
    IonicPageModule.forChild(KategorilerPage),
  ],
})
export class KategorilerPageModule {}
