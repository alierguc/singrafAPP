import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CikisPage } from './cikis';

@NgModule({
  declarations: [
    CikisPage,
  ],
  imports: [
    IonicPageModule.forChild(CikisPage),
  ],
})
export class CikisPageModule {}
