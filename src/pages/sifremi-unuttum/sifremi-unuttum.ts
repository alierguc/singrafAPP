import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController , AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {LoginPage} from '../login/login';
/**
 * Generated class for the SifremiUnuttumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sifremi-unuttum',
  templateUrl: 'sifremi-unuttum.html',
})
export class SifremiUnuttumPage {
  resposeData :any;
  mail:string;
  tumBilgiler:any;
  bilgi = {"mail":this.mail};

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingController:LoadingController,
    public toastController:ToastController, public alertCtrl:AlertController,private authService:AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SifremiUnuttumPage');
  }

don()
  {
    this.navCtrl.push(LoginPage);
  }
  su(){

    let loader = this.loadingController.create({
      content: "Lütfen Bekleyiniz."
    });  
    loader.present();
    if(this.bilgi.mail ){
     this.authService.postData(this.bilgi, "sifremi_unuttum.php").then((result) =>{
      
     this.resposeData = JSON.stringify(result);
     this.tumBilgiler = JSON.parse(this.resposeData);
      console.log(this.tumBilgiler);
  if(this.tumBilgiler["hata"] == "0")
     {
      this.hata0();
        loader.dismiss();

     }
     
     else if(this.tumBilgiler["hata"] == "1")
     {
      this.hata1();
       loader.dismiss();
     }
    
    
     }, (err) => {
      loader.dismiss();
      this.showalertinfo();
       //Connection failed message
     });
    }
    else{
    
     //this.presentToast("Give username and password");
     loader.dismiss();
     this.showalertinfo();
    }
   
   }
   async hata0() {
    const toast = await this.toastController.create({
      message: 'Şifre yenileme linkiniz e-posta adresinize gönderilmiştir.',
      duration: 4000
    });
    toast.present();
  }
   async hata1() {
    const toast = await this.toastController.create({
      message: 'Mail adresiniz bulunamadı.',
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
}

