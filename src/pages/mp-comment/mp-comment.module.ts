import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MpCommentPage } from './mp-comment';

@NgModule({
  declarations: [
    MpCommentPage,
  ],
  imports: [
    IonicPageModule.forChild(MpCommentPage),
  ],
})
export class MpCommentPageModule {}
