import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SssPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sss',
  templateUrl: 'sss.html',
})
export class SssPage {
  public lottieConfig: Object;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.lottieConfig = {
      path: 'assets/imgs/sssanimation.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
  };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SssPage');
  }

}
