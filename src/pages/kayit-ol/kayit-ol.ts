import { Component } from '@angular/core';
import { AlertController, MenuController, LoadingController } from 'ionic-angular';
import { IonicPage, NavController, NavParams, ToastController, NavPop } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { Http, Headers, RequestOptions } from '@angular/http';
/**
 * Generated class for the KayitOlPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kayit-ol',
  templateUrl: 'kayit-ol.html',
})
export class KayitOlPage {
 n_name: string;
  lastname: string;
  mail: string;
  f_name: string;
  l_name: string;
  username: string;
  pass: string;
  repass: string;
  resposeData: any;
  tumBilgiler: any;

  userData = { "n_name": this.n_name, "f_name": this.f_name, "l_name": this.l_name, "mail": this.mail, "pass": this.pass };
  
  constructor(private menu: MenuController, public navCtrl: NavController,
    public navParams: NavParams, private toastCtrl: ToastController, private alertController: AlertController,
    private options: RequestOptions, private http: Http, private loadingCtrl: LoadingController, public authService: AuthServiceProvider,
    public toastController: ToastController) {
      this.menuhidden();
  }
  gpage() {
    this.navCtrl.push(LoginPage);

  }

  menuhidden() {
    this.menu.enable(false);
  }
  register() {


    let loader = this.loadingCtrl.create({
      content: "Kayıt işleminiz yapılıyor."
    });
    loader.present();
    if (this.userData.n_name && this.userData.f_name && this.userData.l_name && this.userData.mail &&
      this.userData.pass.length >= 1 && this.userData.pass == this.repass) {
      this.authService.postData(this.userData, "kayit_ol.php").then((result) => {

        this.resposeData = JSON.stringify(result);
        this.tumBilgiler = JSON.parse(this.resposeData);



        if (this.tumBilgiler["hata"] == "0") {
          this.hata0();
          if (this.navCtrl.push(LoginPage)) {
            loader.dismiss();
          }


        }
        else if (this.tumBilgiler["hata"] == "1") {

          this.hata1();
          loader.dismiss();
        }
        else if (this.tumBilgiler["hata"] == "2") {
          this.hata2();
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

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async hata2() {
    const toast = await this.toastController.create({
      message: 'Mail adresiniz kullanılıyor.',
      duration: 2000
    });
    toast.present();
  }
  async hata5() {
    const toast = await this.toastController.create({
      message: 'Desteklenmeyen mail adresi girdiniz.',
      duration: 2000
    });
    toast.present();
  }
  async hata0() {
    const toast = await this.toastController.create({
      message: 'Aktivasyon linkiniz e-posta adresinize gönderilmiştir.',
      duration: 4000
    });
    toast.present();
  }
  async hata1() {
    const toast = await this.toastController.create({
      message: 'Kullanıcı adınız kullanılıyor.Lütfen başka bir kullanıcı adı seçiniz.',
      duration: 2000
    });
    toast.present();
  }
  async showalertinfo() {
    const toast = await this.toastController.create({
      message: 'Kullanıcı bilgileriniz yanlış.',
      duration: 2000
    });
    toast.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad KayitolpPage');
  }

}
