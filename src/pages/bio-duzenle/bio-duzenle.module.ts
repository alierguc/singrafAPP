import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BioDuzenlePage } from './bio-duzenle';

@NgModule({
  declarations: [
    BioDuzenlePage,
  ],
  imports: [
    IonicPageModule.forChild(BioDuzenlePage),
  ],
})
export class BioDuzenlePageModule {}
