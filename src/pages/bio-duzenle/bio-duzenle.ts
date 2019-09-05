import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions, Response } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-bio-duzenle',
  templateUrl: 'bio-duzenle.html',
})
export class BioDuzenlePage {

  bio: string;
  b_date: string;
  city: string;
  f_name: string;
  l_name: string;
  username: string;
  pass: string;
  repass: string;
  resposeData: any;
  n_name: any;
  new_pass: any;
  rp: any;
  ins: any;
  twit: any;
  datains: any;
  dataface: any;
  datatwitter: any;
  face: any;
  uBilgiler: any;
  bottomData: any;
  userN_name: any;
  userF_name: any;
  userImage: any;
  userLname: any;
  userData = { "f_name": this.f_name, "l_name": this.l_name, "city": this.city, "bio": this.bio, "b_date": this.b_date };
  bodyTwo = { "n_name": this.n_name };
  sociaButton = { "ins": this.ins, "face": this.face, "twit": this.twit };
  bodyThree = { "new_pass": this.new_pass };
  bDegis = { "bio": "X" };
  fString="Facebook kullanıcı adınız";
  iString="İnstagram kullanıcı adınız";
  TString="Twitter kullanıcı adınız"

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http: Http, private toastController: ToastController, private loadingCtrl: LoadingController) {

    this.datains = window.localStorage.getItem('instagram');
    this.datatwitter = window.localStorage.getItem('twitter');
    this.dataface = window.localStorage.getItem("facebook")
    if(this.sociaButton.ins == null)
    {
      this.datains= this.iString;
    }
    if(this.sociaButton.face == null)
    {
      this.dataface= this.fString;
    }
    if(this.sociaButton.twit == null)
    {
      this.datatwitter= this.TString;
    }

    this.userN_name = window.localStorage.getItem('n_name');
    this.userF_name = window.localStorage.getItem('f_name');
    this.userLname = window.localStorage.getItem('l_name');
    this.userImage = window.localStorage.getItem('image');
    this.yukle();
    console.log(window.localStorage.getItem('image'));

  }
  ionViewWillLeave()
  {
    window.localStorage.removeItem("facebook");
    window.localStorage.removeItem("twitter");
    window.localStorage.removeItem("instagram");
  }

  ionViewDidLoad() {
   
  }
  faceKaldir() {
  
    const baseURL = 'https://ilkcandogan.com/'
    const baseParams = 'profil_duzenle.php';

    let testURL = (baseURL + baseParams);
    let authHeader = window.localStorage.getItem('token');

    let headersObj = new Headers();
    headersObj.append('Authorization', authHeader);
    let body = {

      "face": "X",

    }

    this.http.post(testURL, body, { headers: headersObj })
      .map((res: Response) => res.json())
      .subscribe(res => {

        this.resposeData = res;
      
       
        console.log(this.resposeData);



      });

  }
  twitterKaldir() {
  
    const baseURL = 'https://ilkcandogan.com/'
    const baseParams = 'profil_duzenle.php';

    let testURL = (baseURL + baseParams);
    let authHeader = window.localStorage.getItem('token');

    let headersObj = new Headers();
    headersObj.append('Authorization', authHeader);
    let body = {

      "twit": "X",

    }

    this.http.post(testURL, body, { headers: headersObj })
      .map((res: Response) => res.json())
      .subscribe(res => {

        this.resposeData = res;
      
       
        console.log(this.resposeData);



      });

  }
  instagramKaldir() {
  
    const baseURL = 'https://ilkcandogan.com/'
    const baseParams = 'profil_duzenle.php';

    let testURL = (baseURL + baseParams);
    let authHeader = window.localStorage.getItem('token');

    let headersObj = new Headers();
    headersObj.append('Authorization', authHeader);
    let body = {

      "ins": "X",

    }

    this.http.post(testURL, body, { headers: headersObj })
      .map((res: Response) => res.json())
      .subscribe(res => {

        this.resposeData = res;
      
       
        console.log(this.resposeData);



      });

  }


  socialMedia() {
    let loader = this.loadingCtrl.create({
      content: "Bağlantılarınız ekleniyor."
    });
    loader.present();
    const baseURL = 'https://ilkcandogan.com/'
    const baseParams = 'profil_duzenle.php';

    let testURL = (baseURL + baseParams);
    let authHeader = window.localStorage.getItem('token');

    let headersObj = new Headers();
    headersObj.append('Authorization', authHeader);
    let body = {

      "ins": this.sociaButton.ins,
      "face": this.sociaButton.face,
      "twit": this.sociaButton.twit

    }

    this.http.post(testURL, body, { headers: headersObj })
      .map((res: Response) => res.json())
      .subscribe(res => {

        loader.dismiss();
        this.resposeData = res;
        if(this.resposeData["hata"] =="0")
        {
          this.kontrol();
        }
       if(this.sociaButton.face == null)
       {
          this.faceKaldir();
       }
       if(this.sociaButton.ins == null)
       {
            this.instagramKaldir();
       }
       if(this.sociaButton.twit == null)
       {
          this.twitterKaldir();
       }
       



      });

  }


  //#region Şifremi Değiştir
  yukle() {

    const Id = window.localStorage.getItem('idf');
    const baseURL = 'https://ilkcandogan.com/video_profil.php?id=';


    this.http.get(baseURL + Id)
      .map(res => res.json())
      .subscribe(res => {
        console.log(res);

        this.uBilgiler = res.profil;
        this.bottomData = res.video;
        if(this.dataface == "null")
        {
          this.dataface = this.fString;
        }
        if(this.datains == "null")
        {
          this.datains = this.iString;
        }
        if(this.datatwitter == "null")
        {
          this.datatwitter = this.TString;
        }
        console.log(this.uBilgiler);

      }, (err) => {

      });

  }

  sifreDegis() {
    let loader = this.loadingCtrl.create({
      content: "Şifreniz Değiştiriliyor"
    });
    loader.present();
    if (this.bodyThree.new_pass == this.rp) {
      const baseURL = 'https://ilkcandogan.com/'
      const baseParams = 'profil_duzenle.php';

      let testURL = (baseURL + baseParams);
      let authHeader = window.localStorage.getItem('token');

      let headersObj = new Headers();
      headersObj.append('Authorization', authHeader);

      this.http.post(testURL, this.bodyThree, { headers: headersObj })
        .map((res: Response) => res.json())
        .subscribe(res => {
          this.resposeData = res;

          loader.dismiss();
          if (this.resposeData["TOKEN"]) {
            this.dhata0();
            window.localStorage.setItem("token", this.resposeData["TOKEN"]);
            console.log(window.localStorage.getItem("token"));
          }
          console.log(res);

        });

    }
    else {
      console.log("Bir değil");
    }

  }

  //#endregion

  degistir() {
    let loader = this.loadingCtrl.create({
      content: "Kullanıcı Bilgileriniz Güncelleniyor"
    });
    loader.present();
    if (this.userData.bio == "") {
      const baseURL = 'https://ilkcandogan.com/'
      const baseParams = 'profil_duzenle.php';

      let testURL = (baseURL + baseParams);
      let authHeader = window.localStorage.getItem('token');

      let headersObj = new Headers();
      headersObj.append('Authorization', authHeader);

      this.http.post(testURL, this.bDegis.bio, { headers: headersObj })
        .map((res: Response) => res.json())
        .subscribe(res => {
          this.resposeData = res;
          loader.dismiss();
          console.log(res);

        });
    }
    else {
      const baseURL = 'https://ilkcandogan.com/'
      const baseParams = 'profil_duzenle.php';

      let testURL = (baseURL + baseParams);
      let authHeader = window.localStorage.getItem('token');

      let headersObj = new Headers();
      headersObj.append('Authorization', authHeader);
      var newStr = this.userData;
      var renewStr=newStr.toString().replace(this.userData.f_name,"_");

      this.http.post(testURL, this.userData, { headers: headersObj })
        .map((res: Response) => res.json())
        .subscribe(res => {
          this.resposeData = res;
          loader.dismiss();

          if (this.resposeData["hata"] == "0") {

            this.hata0();

          }
          else {
            this.hata8();
          }
          console.log(res);

        });

    }



  }
  kullaniciDegistir() {
    if (this.n_name == "" && this.n_name == null) {
      this.hata12();
    }
    else {
      let loader = this.loadingCtrl.create({
        content: "Kullanıcı Bilgileriniz Güncelleniyor"
      });
      loader.present();
      const baseURL = 'https://ilkcandogan.com/'
      const baseParams = 'profil_duzenle.php';

      let testURL = (baseURL + baseParams);
      let authHeader = window.localStorage.getItem('token');

      let headersObj = new Headers();
      headersObj.append('Authorization', authHeader);

      this.http.post(testURL, this.bodyTwo, { headers: headersObj })
        .map((res: Response) => res.json())
        .subscribe(res => {
          this.resposeData = res;
          loader.dismiss();

          if (this.resposeData["hata"] == "0") {

            this.hata2();

          }
          else if (this.resposeData["hata"] == "5") {

            this.hata5();

          }
          if (this.resposeData["hata"] == "6") {

            this.hata6();

          }
          else {
            console.log("İnternet Bağlantınızı Kontrol Ediniz.")
          }
          console.log(res);

        });
    }



  }
  async kontrol() {
    const toast = await this.toastController.create({
      message: 'Sosyal medya bağlantılarınız güncellendi.',
      duration: 2000
    });
    toast.present();
  }
  async hata0() {
    const toast = await this.toastController.create({
      message: 'Profil Bilgileriniz Başarıyla Güncellendi...',
      duration: 2000
    });
    toast.present();
  }
  async kaldir0() {
    const toast = await this.toastController.create({
      message: 'Sosyal medya hesabınız kaldırıldı.',
      duration: 2000
    });
    toast.present();
  }
  async ekle0() {
    const toast = await this.toastController.create({
      message: 'Sosyal medya hesabınız eklendi.',
      duration: 2000
    });
    toast.present();
  }
  async dhata0() {
    const toast = await this.toastController.create({
      message: 'Şifreniz Başarıyla Değiştirildi...',
      duration: 2000
    });
    toast.present();
  }
  async hata12() {
    const toast = await this.toastController.create({
      message: 'Lütfen Kullanıcı adını boş bırakmayınız...',
      duration: 2000
    });
    toast.present();
  }
  async hata5() {
    const toast = await this.toastController.create({
      message: 'Başka bir hesap tarafından kullanılıyor...',
      duration: 2000
    });
    toast.present();
  }

  async hata2() {
    const toast = await this.toastController.create({
      message: 'Kullanıcı Adınız Güncellendi...',
      duration: 2000
    });
    toast.present();
  }

  async hata8() {
    const toast = await this.toastController.create({
      message: 'Belirlenemeyen Bir hata oluştu...',
      duration: 2000
    });
    toast.present();
  }

  async hata6() {
    const toast = await this.toastController.create({
      message: 'Yetersiz Coin',
      duration: 2000
    });
    toast.present();
  }

}




