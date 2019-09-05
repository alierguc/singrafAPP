import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Http, Headers, Response } from '@angular/http';

import { AdMobFree, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';
@IonicPage()
@Component({
  selector: 'page-reklam',
  templateUrl: 'reklam.html',

})
export class ReklamPage {
  public lottieConfig2: Object
  data: any;
  count=0;
  control: any; /*   reklamString = "Tebrikler Coin Kazandınız. !"*/
  reklamString = "Reklamınız hazırlanıyor lütfen bekleyiniz.";
  reklam2String = "Tebrikler Coin Kazandınız. !";
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private admobFree: AdMobFree, private http: Http,
    private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.lottieConfig2 = {
      path: 'assets/imgs/reklamload.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };
    this.rewardedVideoBaslangic();

  }

  istek() {

    let loader = this.loadingCtrl.create({
      content: "Lütfen Bekleyiniz."
    });
    const baseURL = 'https://ilkcandogan.com/'
    const baseParams = 'coin_reward.php';

    let testURL = (baseURL + baseParams);
    let authHeader = JSON.stringify(window.localStorage.getItem('token'));
    let body = {
      /* null parametre yerine | null body yerel değişkeni */
    }
    let headersObj = new Headers();
    headersObj.append('Authorization', authHeader); 
    this.http.post(testURL, JSON.stringify(body), { headers: headersObj })
      .map((res: Response) => res.json())
      .subscribe(res => {
        this.control = res.response;
        if (this.control.hata == "0") {
          this.hata0();
          loader.dismiss();
        }
        if (this.control.hata == "2") {
          this.hata1();
          loader.dismiss();
        }

        console.log(res);
      });
  }

  rewardedVideoBaslangic() {
    const RewardConf: AdMobFreeRewardVideoConfig = {

      id: "ca-app-pub-2851043339565426/1928293298",
      isTesting: false,
      autoShow: true
    };
    this.admobFree.rewardVideo.config(RewardConf);

    this.admobFree.rewardVideo.prepare()
      .then(() => {

      })
      .catch(e => alert(JSON.stringify(e)));
/*admob.rewardvideo.events.LOAD_FAIL */
   
document.addEventListener('admob.rewardvideo.events.LOAD_FAIL', (err) => {

this.hata2();
});

    document.addEventListener('admob.rewardvideo.events.REWARD', () => {

      this.count++;
      if (this.count == 1) {
        this.istek();
        this.reklamString = this.reklam2String;
        this.hata0();
      }


    });
  }
  hata0() {
    let toast = this.toastCtrl.create({
      message: 'Tebrikler coin Kazandınız.',
      duration: 2000,
      position: 'top'
    });
  }
  hata1() {
    let toast = this.toastCtrl.create({
      message: 'Bugünlük reklam izleme hakkınız dolmuştur.',
      duration: 2000,
      position: 'top'
    });
  }
  hata2() {
    let toast = this.toastCtrl.create({
      message: 'Lütfen daha sonra tekrar deneyiniz.',
      duration: 2000,
      position: 'top'
    });
  }
}
