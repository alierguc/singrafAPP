import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { PopoverPage } from '../popover/popover';
import { YorumlarPage } from '../yorumlar/yorumlar';


@IonicPage()
@Component({
  selector: 'page-muzik-ara',
  templateUrl: 'muzik-ara.html',
})
export class MuzikAraPage {
  noRecord: boolean;
  veri:any[];
  record:boolean;
  users:any[];
  SSID:any;
  resposeData: any;
  bildiriDegisken: any;
  encodet:any;
  text:any;
  buttonIcon: string;
  homeLike:any;
  PId:any;
  bilgi = { "text": this.text}
  public lottieConfig: Object;
  public lottieConfig3: Object;
  private anim: any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http:Http,private toastController:ToastController) {
      this.record = false;
      this.lottieConfig = {
        path: 'assets/imgs/search.json',
        renderer: 'canvas',
        autoplay: true,
        loop: true
    };
    this.lottieConfig3 = {
      path: 'assets/imgs/notfound.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
  };
    this.noRecord = false;
  }
  handleAnimation(anim: any) {
    this.anim = anim;
}
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad MuzikAraPage');
  }
  toggleIcon(MUSIC_ID,L) {

    if (L === 'ios-thumbs-up-outline')

      try {


        const begeni = "1";
        const baseURL = 'https://ilkcandogan.com/'
        const baseParams = 'video_begeni.php';

        let testURL = (baseURL + baseParams);
        let authHeader = window.localStorage.getItem('token');

        let headersObj = new Headers();
        headersObj.append('Authorization', authHeader);

        let body = {
          "muzik_id": MUSIC_ID,
          "begeni": begeni
        }

        this.http.post(testURL, body, { headers: headersObj })
          .map((res: Response) => res.json())
          .subscribe(res => {
            this.homeLike = res;
            this.buttonIcon = "ios-thumbs-up";
            this.muzikAra();

            if (this.homeLike["hata"] == "0") {
         
              this.begen0();

            }
            else {
              console.log("İnternet Bağlantınızı Kontrol Ediniz.")
            }
            console.log(res);

          });
      }
      catch
      {
        
      }


    else if (L === 'ios-thumbs-up') {

      try {


        const begeni = "0";
        const baseURL = 'https://ilkcandogan.com/'
        const baseParams = 'video_begeni.php';

        let testURL = (baseURL + baseParams);
        let authHeader = window.localStorage.getItem('token');

        let headersObj = new Headers();
        headersObj.append('Authorization', authHeader);

        let body = {
          "muzik_id": MUSIC_ID,
          "begeni": begeni
        }

        this.http.post(testURL, body, { headers: headersObj })
          .map((res: Response) => res.json())
          .subscribe(res => {
            this.homeLike = res;
        
            this.buttonIcon = "ios-thumbs-up-outline";
            this.muzikAra();


            console.log(res);

          });
      }
      catch
      {
       
      }
    }
  }



  bildirilerTetikle(MUSIC_ID) {



    const baseURL = 'https://ilkcandogan.com/'
    const baseParams = 'video_sikayet.php';

    let testURL = (baseURL + baseParams);
    let authHeader = window.localStorage.getItem('token');

    let headersObj = new Headers();
    headersObj.append('Authorization', authHeader);

    let body = {
      "video_id": MUSIC_ID
    }

    this.http.post(testURL, body, { headers: headersObj })
      .map((res: Response) => res.json())
      .subscribe(res => {
        this.bildiriDegisken = res;
        console.log(this.bildiriDegisken);

        if (this.bildiriDegisken["hata"] == "0") /* Başarılı*/ {
          this.hatabildir0();

        }
        else if (this.bildiriDegisken["hata"] == "3") { /* Zaten Şikayet Edildi */
          this.hatabildir1();
        }
        else {
          console.log("İnternet Bağlantınızı Kontrol Ediniz.")
        }
        console.log(res);

      });


  }
  async hatabildir0() {
    const toast = await this.toastController.create({
      message: 'Kullanıcı Şikayet Edildi',
      duration: 2000
    });
    toast.present();
  }
  async begen0() {
    const toast = await this.toastController.create({
      message: 'Videoyu Beğendiniz.',
      duration: 2000
    });
    toast.present();
  }
  async begen9() {
    const toast = await this.toastController.create({
      message: 'Videoyu Zaten Beğendiniz.',
      duration: 2000
    });
    toast.present();
  }
  async hatabildir1() {
    const toast = await this.toastController.create({
      message: 'Kullanıcıyı Zaten Şikayet Ettiniz.',
      duration: 2000
    });
    toast.present();
  }
  muzikAra() {

    this.SSID = 0;
    this.encodet = encodeURI(this.bilgi.text);
    let authHeader = window.localStorage.getItem('token');

    let headersObj = new Headers();
    headersObj.append('Authorization', authHeader);
    const baseURL = 'https://ilkcandogan.com/ara.php?text='+this.encodet;
    this.http.get(baseURL + "&start=" + this.SSID, { headers: headersObj })
      .map(res => res.json())
      .subscribe(res => {
        console.log(res);
        this.users = res.bilgi;
        this.SSID = res.SON_ID;
        if(res.SON_ID == null)
        {
          this.record = true;
        }
        
      }, (err) => {
        
      });
  }
  presentPopover(myEvent, myEvent2,myEvent3) {
    this.PId = myEvent;
    this.navCtrl.push(PopoverPage, {
      idP: myEvent,
      Nickname: myEvent2,
      image:myEvent3

    });
  }
  yorumlar(myEvent, sParam) {
    this.navCtrl.push(YorumlarPage, {
      mId: myEvent,
      yanitla: sParam

    });
  }

  doInfinite(InfiniteScroll): Promise<any> {

    return new Promise((resolve) => {
      setTimeout(() => {

        const baseURL = 'https://ilkcandogan.com/ara.php?text='+this.encodet;
        this.http.get(baseURL + "&start=" + this.SSID)
          .map(res => res.json())
          .subscribe(res => {
            console.log(res);
            this.resposeData = res;
            this.veri = this.resposeData.bilgi;
            if (this.resposeData.bilgi.N_NAME !== null) {
              if (this.resposeData.SON_ID !== null) {
                for (let index = 0; index < this.veri.length; index++) {
                  this.users.push(this.veri[index]);
                }
              }
              else {
                this.noRecord = true;
              }
            }

            this.SSID = res.SON_ID;
            InfiniteScroll.complete();

          }, (err) => {
         


          });


      }, 4000);

    })
  }
}
