import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-presimonizle',
  templateUrl: 'presimonizle.html',
})
export class PresimonizlePage {
  navimage:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    this.navimage = navParams.get('resim');
    console.log(this.navimage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PresimonizlePage');
  }
  kapat()
  {
    this.viewCtrl.dismiss();
  }
}
