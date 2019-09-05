import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import {KayitOlPage} from '../kayit-ol/kayit-ol';
import {HomePage} from '../home/home';
import {SifremiUnuttumPage} from '../sifremi-unuttum/sifremi-unuttum';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Platform,Slides } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {Device} from '@ionic-native/device';
import { StatusBar } from '@ionic-native/status-bar';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  anaUrl = "https://ilkcandogan.com";
  mail: string;
  pass: string;
  mac: string = '112233445566';
  resposeData: any;
  teleUuid:any;
  userDetails: any;
  /*bilgi = { 
    "mail": this.mail, "pass": this.pass,"uuid":this.Device.uuid };*/

    bilgi = { 
      "mail": this.mail, "pass": this.pass,"uuid":this.Device.uuid};
  tumBilgiler: any;
  POSTBilgi: any;
  POSTA: any;

  constructor(private LoadingLogin: LoadingController
    ,private loginmenu: MenuController,
    public navCtrl: NavController, public navParams: NavParams,
    private http: Http
    ,private _platform: Platform, private options: RequestOptions, public alertCtrl: AlertController,
    public authService: AuthServiceProvider, private loadingCtrl: LoadingController,
    private toastController: ToastController,private Device:Device,private statusbar:StatusBar) {
      this.statusbar.overlaysWebView(false);
      this.statusbar.backgroundColorByHexString('#ce0e0e');
      this.loginhidden();
     
      /*if (window.localStorage.getItem('token') != null) {
  
        this.navCtrl.push(HomePage);
  
  
      }
      else if (window.localStorage.getItem('token')) {
  
  
        this.navCtrl.push(LoginPage);
        this.navCtrl.setRoot(HomePage);
     
      }*/
      
    }
  
  
    loginhidden() {
      this.loginmenu.enable(false);
  
    }
  
  
  
    kayitol() {
      this.navCtrl.push(KayitOlPage);
  
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad LoginPage');
    }
  
    sifremiunuttump() {
      this.navCtrl.push(SifremiUnuttumPage);
  
    }
  
    sil() {
      window.localStorage.removeItem('token');
      return true;
    }
  
  
 
    users: any;
    login() {
  
      let loader = this.loadingCtrl.create({
        content: "Giriş Yapılıyor"
      });
      loader.present();
      if (this.bilgi.mail && this.bilgi.pass && this.bilgi.mail.length >8 && this.bilgi.pass.length > 7 
         && this.bilgi.uuid != null) {
        this.teleUuid = this.Device.uuid;
        this.authService.postData(this.bilgi, "giris.php").then((result) => {
       
          this.resposeData = JSON.stringify(result);
          this.tumBilgiler = JSON.parse(this.resposeData);
          console.log(this.tumBilgiler);
  
          window.localStorage.setItem('token', this.tumBilgiler["TOKEN"]);
          window.localStorage.setItem('idf', this.tumBilgiler["ID"]);
          window.localStorage.setItem('n_name', this.tumBilgiler["N_NAME"]);
          window.localStorage.setItem('f_name', this.tumBilgiler["F_NAME"]);
          window.localStorage.setItem('l_name', this.tumBilgiler["L_NAME"]);
          window.localStorage.setItem('city', this.tumBilgiler["CITY"]);
          window.localStorage.setItem('b_date', this.tumBilgiler["B_DATE"]);
          window.localStorage.setItem('skor', this.tumBilgiler["SCORE"]);
          window.localStorage.setItem('bio', this.tumBilgiler["BIO"]);
          window.localStorage.setItem('coin', this.tumBilgiler["COIN"]);
          window.localStorage.setItem('image', this.tumBilgiler["IMAGE"]);
          window.localStorage.setItem('reg_frame_id', this.tumBilgiler["REG_FRAME_ID"]);

          if (this.tumBilgiler["hata"] == "0") {
            if (this.navCtrl.setRoot(HomePage)) {
              loader.dismiss();
            }
  
  
          }
  
          else if (this.tumBilgiler["hata"] == "3") {
            this.hata3();
            loader.dismiss();
          }
          else if (this.tumBilgiler["hata"] == "1" || this.tumBilgiler["hata"] == "2") {
  
            this.hata6();
            loader.dismiss();
          }
          else if (this.tumBilgiler["hata"] == "4") {
            this.hata4();
            loader.dismiss();
          }
          else if (this.tumBilgiler["hata"] == "5") {
  
            this.hata5();
            loader.dismiss();
          }
  
        }, (err) => {
          loader.dismiss();
          this.showalertinfo();
          //Connection failed message
        });
      }
      else {
  
        //this.presentToast("Give username and password");
        loader.dismiss();
        this.showalertinfo();
      }
  
    }
    async hata6() {
      const toast = await this.toastController.create({
        message: 'Kullanıcı Bilgileriniz yanlış.',
        duration: 2000
      });
      toast.present();
    }
    async showalertinfo() {
      const toast = await this.toastController.create({
        message: 'Kullanıcı Bilgileriniz yanlış.',
        duration: 2000
      });
      toast.present();
    }
  
    async hata3() {
      const toast = await this.toastController.create({
        message: 'Hesabınız Engellenmiştir.',
        duration: 2000
      });
      toast.present();
    }
    async hata4() {
      const toast = await this.toastController.create({
        message: 'Hesap Aktif değil.Lütfen mail adresinize gelen aktivasyon kodunu etkinleştirin.',
        duration: 4000
      });
      toast.present();
    }
    async hata5() {
      const toast = await this.toastController.create({
        message: 'Hesap Başka Cihazda aktif.',
        duration: 2000
      });
      toast.present();
    }
  
    exit() {
      this._platform.exitApp();
    }
   
    onregister() {
      this.navCtrl.push(KayitOlPage);
    }
  
  }
  