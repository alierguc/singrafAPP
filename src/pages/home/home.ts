

import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { ProfilPage } from '../profil/profil';
import { VideoYuklePage } from '../video-yukle/video-yukle';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { StatusBar } from '@ionic-native/status-bar';
import { LoadingController, MenuController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { PopoverController, ViewController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
import {LikelistPage} from '../likelist/likelist';
import { ReklamPage } from '../reklam/reklam';
import { LoginPage } from '../login/login';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HaftaninBirincileriPage } from '../haftanin-birincileri/haftanin-birincileri';
import { HaberlerPage } from '../haberler/haberler';
import { ChatRoomPage } from '../chat-room/chat-room';
import { VeritabaniProvider } from '../../providers/veritabani/veritabani';
import { Socket } from 'ng-socket-io';
import 'rxjs/add/operator/map';
import { YorumlarPage } from '../yorumlar/yorumlar';
import { KategorilerPage } from '../kategoriler/kategoriler';
import { Observable } from 'rxjs/Observable';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { MuzikAraPage } from '../muzik-ara/muzik-ara';
import { Network } from '@ionic-native/network';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  
})
export class HomePage {
  public userDetails: any;
  public img: any;
  public userPostData: any;
  public resposeData: any;
  public ProfilID: any;
  public SSID: any;
  user: any;
  PId: any;
  likepagemusicid:any;
  homeLike: any;

  sonCekme: any;
  bildiriDegisken: any;
  searchQuery: string = '';
  items: any[];
  testRadioOpen: boolean;
  testRadioResult;
  endpoint = "https://ilkcandogan.com/";
  public isSearchBarOpened = false;

 
  videoUrl: string;
  UserId: any;
  created: any;
  LastCreated: any;
  users: any[];
  veri: any[];
  profilID: any;
  openMenu = false;
  @ViewChild('myvideo') myVideo: any;
  mediaFiles = [];
  tumBilgiler: any;
  sayfa?: any;
  noRecord: boolean;
  lottieControl:boolean;
  data: any;
  count: number = 0;
  buttonIcon: string;
  public userdata: any;
  fakeUsers: Array<any> = new Array(5);
  Videoitem: any;
  token: any;
  soketHost: any;
  likeControl:any[];
  
  public lottieConfig: Object
  public lottieConfig2: Object
  constructor(public viewCtrl: ViewController, public menuh: MenuController, public loadingCtrl: LoadingController, public popoverCtrl: PopoverController, private toastCtrl: ToastController, public alertCtrl:
    AlertController, public navCtrl: NavController, private NavParams: NavParams, private media: Media,
    private file: File, private auth: AuthServiceProvider, private http: Http, private toastController: ToastController,
    private soket: Socket, private admobFree: AdMobFree, private platform: Platform, 
    private veritabani: VeritabaniProvider,private network:Network,private statusbar:StatusBar) {
      
      const bannerConfig: AdMobFreeBannerConfig = {

        id: "ca-app-pub-2851043339565426/7453408132",
        isTesting: false,
        autoShow: true
      };
      this.admobFree.banner.config(bannerConfig);

      this.admobFree.banner.prepare()
        .then(() => {
          // banner Ad is ready
          // if we set autoShow to false, then we will need to call the show method here
        })
        .catch(e => console.log(e));
    
      this.lottieConfig = {
        path: 'assets/imgs/homeload.json',
        renderer: 'canvas',
        autoplay: true,
        loop: true
      };
      this.lottieConfig2 = {
        path: 'assets/imgs/notfound.json',
        renderer: 'canvas',
        autoplay: true,
        loop: true
      };
      this.statusbar.overlaysWebView(false);
      this.statusbar.backgroundColorByHexString('#ce0e0e');

    //#region İnternet Bağlantı Kontrolü
   

    //#endregion

    this.baslangic();
    //#region 


    this.noRecord = false;
    this.lottieControl = false;
    window.localStorage.removeItem("idx");
    const DATA1 = window.localStorage.getItem('f_name');
    const DATA2 = window.localStorage.getItem('image');
    this.userDetails = DATA1;
    this.img = DATA2;

    console.log(window.localStorage.getItem('token'));
    console.log(window.localStorage.getItem('n_name'));
    console.log(window.localStorage.getItem('f_name'));
    console.log(window.localStorage.getItem('l_name'));
    console.log(window.localStorage.getItem('city'));
    console.log(window.localStorage.getItem('b_date'));
    console.log(window.localStorage.getItem('skor'));
    console.log(window.localStorage.getItem('coin'));
    console.log(window.localStorage.getItem('image'));
    console.log(window.localStorage.getItem('reg_frame_id'));
    console.log(window.localStorage.getItem('idf'));


    this.sayfa = NavParams.get('data');
    this.menuok();

    //#endregion
  }


  chyonlendir() {
    this.navCtrl.push(ChatRoomPage);
  }
  Giris() {

    if (window.localStorage.getItem('tekrar') === '0') {
      if (typeof this.soket.connect().id !== 'undefined') {
        this.soket.emit('giris-yap', window.localStorage.getItem('token'));
        window.localStorage.setItem('tekrar' , "1");
      }
      else {
       
      }
    }
    else {
      //this.soket.emit('giris-yap', window.localStorage.getItem('token'));

    }

    this.soket.on('connect', () => {
      this.soket.emit('giris-yap', window.localStorage.getItem('token'));
    });

  }



  muzikAra() {
    this.navCtrl.push(MuzikAraPage);
  }
  ionViewDidLoad() {
    if (this.platform.is('cordova')) {
      const bannerConfig: AdMobFreeBannerConfig = {

        id: "ca-app-pub-2851043339565426/4072644908",
        isTesting: false,
        autoShow: true
      };
      this.admobFree.banner.config(bannerConfig);

      this.admobFree.banner.prepare()
        .then(() => {
          // banner Ad is ready
          // if we set autoShow to false, then we will need to call the show method here
        })
        .catch(e => console.log(e));
    }

  }
  togglePopupMenu() {
    return this.openMenu = !this.openMenu;
  }
  onViewDidLoad() {
    // Put here the code you want to execute
  }
  async delay(ms: number) {
    await new Promise(
      resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }
  yorumlar(myEvent, sParam) {
    this.navCtrl.push(YorumlarPage, {
      mId: myEvent,
      yanitla: sParam

    });
  }

  kategoriler() {
    this.navCtrl.push(KategorilerPage);
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
            this.baslangic();

            if (this.homeLike["hata"] == "0") {
         
              this.hata0();

            }
            else {
              console.log("İnternet Bağlantınızı Kontrol Ediniz.")
            }
            console.log(res);

          });
      }
      catch
      {
        this.hata9();
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
            this.baslangic();


            console.log(res);

          });
      }
      catch
      {
        this.hata9();
      }
    }



  }
  myP(myEvent) {
    this.navCtrl.push(ProfilPage, {
      mId: myEvent,
    });
  }
  singappHaberler() {
    this.navCtrl.push(HaberlerPage);
  }
  haftaninBirincileri() {
    this.navCtrl.push(HaftaninBirincileriPage);
  }
  likepage(musicid) {
    this.likepagemusicid = musicid;
    this.navCtrl.push(LikelistPage, {
      likepagemusicid: musicid,
   

    });
  }
  presentPopover(myEvent, myEvent2,myEvent3) {
    this.PId = myEvent;
    this.navCtrl.setRoot(PopoverPage, {
      idP: myEvent,
      Nickname: myEvent2,
      image:myEvent3

    });
  }
  begeniGeriCek(MUSIC_ID) {
    if
      (this.buttonIcon === 'ios-thumbs-up-outline') {
      this.buttonIcon = "ios-thumbs-up";


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

            this.baslangic();

            if (this.homeLike["hata"] == "0") {
              this.hata0();

            }
            else if (this.homeLike["hata"] == "2") {
              this.hata2();
            }
            else {
              console.log("İnternet Bağlantınızı Kontrol Ediniz.")
            }
            console.log(res);

          });
      }
      catch
      {
        this.hata9();
      }
    }
  }


  //#region Beğen Olayı
  begen(MUSIC_ID) {

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

          this.baslangic();

          if (this.homeLike["hata"] == "0") {
            this.hata0();

          }
          else if (this.homeLike["hata"] == "2") {
            this.hata2();
          }
          else {
            console.log("İnternet Bağlantınızı Kontrol Ediniz.")
          }
          console.log(res);

        });
    }
    catch
    {
      this.hata9();
    }
  }
  //#endregion

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      const baseURL = 'https://ilkcandogan.com/videolar.php';
      this.http.get(baseURL + "?start=0")
        .map(res => res.json())
        .subscribe(res => {
          console.log(res);
          this.resposeData = res;
          this.baslangic();
          event.complete();
        })

    }, 2000);
  }

  //#region İnfinite
  doInfinite(InfiniteScroll): Promise<any> {

    return new Promise((resolve) => {
      setTimeout(() => {

        const baseURL = 'https://ilkcandogan.com/videolar.php';
        this.http.get(baseURL + "?start=" + this.SSID)
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


  //#endregion

  //#region Başlangıçta çalışan istek Metodu
  baslangic() {
    this.SSID = 0;
    const baseURL = 'https://ilkcandogan.com/videolar.php';
    let authHeader = JSON.stringify(window.localStorage.getItem('token'));

    let headersObj = new Headers();
    headersObj.append('Authorization', authHeader);
    this.http.get(baseURL + "?start=" + this.SSID,{ headers: headersObj })
      .map(res => res.json())
      .subscribe(res => {
        console.log(res);
        this.users = res.bilgi;
        this.SSID = res.SON_ID;
        this.likeControl = res.bilgi;
        if(this.SSID == null)
        {
          this.lottieControl = true;

        }
        
        
    
      
        this.Giris();
      }, (err) => {
       
      });

      //#region OneSignal
      if(window.localStorage.getItem('PlayId') != null && window.localStorage.getItem('PlayIdCheck') == null){
          this.playIdGonder(window.localStorage.getItem('PlayId'), window.localStorage.getItem('token'));
      }

      //#endregion
  }

  playIdGonder(play_id,token) {
    const URL = 'https://ilkcandogan.com/player_id.php';
    
    let authHeader = token;
    let body = {
      "player_id": play_id,
      "Authorization":authHeader
    }

    this.http.post(URL, body)
      .map((res: Response) => res.json())
      .subscribe(res => {
        //console.log(res);
        if(res["hata"] == "0"){
         
          window.localStorage.setItem('PlayIdCheck','1');
        }
        
      });
  }



  //#endregion




  //#region Çıkış(credentials)
  yaz(credentials) {
    let loader = this.loadingCtrl.create({
      content: "Çıkış Yapılıyor"
    });
    loader.present();
    const baseURL = 'https://ilkcandogan.com/'
    const baseParams = 'cikis.php';

    let testURL = (baseURL + baseParams);
    let authHeader = JSON.stringify(window.localStorage.getItem('token'));

    let headersObj = new Headers();
    headersObj.append('Authorization', authHeader);
    this.http.post(testURL, JSON.stringify(credentials), { headers: headersObj })
      .map((res: Response) => res.json())
      .subscribe(res => {
        /*   this.webReturn = res; */
        window.localStorage.removeItem('token')
        this.navCtrl.push(LoginPage);
        loader.dismiss();
      });

  }

  //#endregion

  close() {
    this.viewCtrl.dismiss();
  }

  menuok() {
    this.menuh.enable(true);
  }


  Profil(myEvent) {
    this.profilID = myEvent;
    this.navCtrl.push(ProfilPage, {
      idP: myEvent,

    });
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





  //#region Alet ve Toastlar
  
  reklam() {
    this.navCtrl.setRoot(ReklamPage);
  }

  lToast() {
    let toast = this.toastCtrl.create({
      message: 'Videoyu beğendim',
      duration: 2000,
      position: 'top'
    });
    

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  dToast() {
    let toast = this.toastCtrl.create({
      message: 'Videoyu beğenmedim',
      duration: 2000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  indirToast() {
    let toast = this.toastCtrl.create({
      message: 'Videonuz indiriliyor',
      duration: 2000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  //#endregion


  async hata0() {
    const toast = await this.toastController.create({
      message: 'Videoyu Beğendiniz.',
      duration: 2000
    });
    toast.present();
  }


  async hatabildir0() {
    const toast = await this.toastController.create({
      message: 'Kullanıcı Şikayet Edildi',
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
  async hata2() {
    const toast = await this.toastController.create({
      message: 'Videoyu Zaten Beğenmişsiniz.',
      duration: 2000
    });
    toast.present();
  }
  async hata9() {
    const toast = await this.toastController.create({
      message: 'Belirlenemeyen bir hata oluştu.',
      duration: 2000
    });
    toast.present();
  }
  async hata6() {
    const toast = await this.toastController.create({
      message: 'Videoyu Zaten Beğenmediniz.',
      duration: 2000
    });
    toast.present();
  }
  async hata3() {
    const toast = await this.toastController.create({
      message: 'Videoyu Beğenmediniz. ',
      duration: 2000
    });
    toast.present();
  }





  EkleSekmesi() {

    this.navCtrl.push(VideoYuklePage);

  }


  profilSekmesi() {
    this.navCtrl.push(ProfilPage);

  }

}

