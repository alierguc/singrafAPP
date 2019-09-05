import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http,Headers,RequestOptions,Response } from '@angular/http';
import { LoadingController,MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { VeritabaniProvider } from '../../providers/veritabani/veritabani';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
@IonicPage()
@Component({
  selector: 'page-cikis',
  templateUrl: 'cikis.html',
})
export class CikisPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http,
    private loadingCtrl:LoadingController,private veritabani:VeritabaniProvider,private admobFree:AdMobFree) {
      window.localStorage.removeItem('PlayIdCheck');
      const bannerConfig: AdMobFreeBannerConfig = {

        id: "ca-app-pub-2851043339565426/7453408132",
        isTesting: false,
        autoShow: true
      };
      this.admobFree.banner.config(bannerConfig);
  
      this.admobFree.banner.hide()
        .then(() => {
          // banner Ad is ready
          // if we set autoShow to false, then we will need to call the show method here
        })
        .catch(e => console.log(e));

  }

 
  ionViewDidLoad(credentials) {
    let loader = this.loadingCtrl.create({
      content: "Çıkış Yapılıyor"
    });  
    loader.present();
      const baseURL = 'https://ilkcandogan.com/'
      const baseParams = 'cikis.php';
  
      let testURL = (baseURL+baseParams);
      let authHeader = JSON.stringify(window.localStorage.getItem('token'));
  
      let headersObj = new Headers();
      headersObj.append('Authorization', authHeader);
      this.http.post(testURL,JSON.stringify(credentials), {headers:headersObj})
        .map((res:Response) => res.json())
        .subscribe(res => {
       /*   this.webReturn = res; */
          window.localStorage.removeItem('token')      
          this.navCtrl.push(LoginPage);
          loader.dismiss();
          this.veritabani.mesajSil();
        });
  }

}
