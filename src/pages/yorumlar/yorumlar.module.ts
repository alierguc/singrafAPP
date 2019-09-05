import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YorumlarPage } from './yorumlar';

@NgModule({
  declarations: [
    YorumlarPage,
  ],
  imports: [
    IonicPageModule.forChild(YorumlarPage),
  ],
})
export class YorumlarPageModule {}
