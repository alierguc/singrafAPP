import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AdMobFree,AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

@IonicPage()
@Component({
  selector: 'page-habericerik',
  templateUrl: 'habericerik.html',

})
export class HabericerikPage {

  haberId:any;
  habericerik:any;
  altImg:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http,private admobFree:AdMobFree) {
    const insterstiteal: AdMobFreeInterstitialConfig = {

      id: "ca-app-pub-2851043339565426/2073003226",
      isTesting: false,
      autoShow: true
    };
    this.admobFree.interstitial.config(insterstiteal);

    this.admobFree.interstitial.prepare()
      .then(() => {
        // banner Ad is ready
        // if we set autoShow to false, then we will need to call the show method here
      })
      .catch(e => console.log(e));
    this.cek();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HabericerikPage');
  }
  cek()
  {
    this.haberId = window.localStorage.getItem("haberId");
    const baseURL = 'https://ilkcandogan.com/icerik.php'; 
   this.http.get(baseURL+"?id="+this.haberId)
   .map(res => res.json())
   .subscribe(res => {
     console.log(res);
     this.habericerik =res.bilgi;
   }, (err) => {

   });
   }
  }
  