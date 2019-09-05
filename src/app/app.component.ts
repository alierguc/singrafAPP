import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingController,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HaberlerPage } from '../pages/haberler/haberler';
import { HaftaninBirincileriPage } from '../pages/haftanin-birincileri/haftanin-birincileri';
import { HakkindaPage } from '../pages/hakkinda/hakkinda';
import { KategorilerPage } from '../pages/kategoriler/kategoriler';
import { LoginPage } from '../pages/login/login';
import { ProfilPage } from '../pages/profil/profil';
import { SssPage } from '../pages/sss/sss';
import { VideoYuklePage } from '../pages/video-yukle/video-yukle';
import { HomePage } from '../pages/home/home';
import { Http,Response } from '@angular/http';
import { CikisPage } from '../pages/cikis/cikis';
import { Socket } from 'ng-socket-io';
import { VeritabaniProvider } from '../providers/veritabani/veritabani';
import { Observable } from 'rxjs/Observable';
import { NativeAudio } from '@ionic-native/native-audio';
import { LocalNotifications } from '@ionic-native/local-notifications';
import {ChatPage} from '../pages/chat/chat';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  pages: Array<{ title: string, icon: string, component: any, category: string, }>;
  activePage: any;
  tokenuzunluk:any;
  dizi: any = [];
  uzunluk: any;


  constructor(public platform: Platform, _statusBar: StatusBar, splashScreen: SplashScreen, private http: Http
    , private loadingCtrl: LoadingController, public statusBar: StatusBar, private soket: Socket,
    private veritabani: VeritabaniProvider, private nativeAudio: NativeAudio,private localNotifications: LocalNotifications,
    private alertCtrl:AlertController) {
    this.platform.ready().then(() => {
      splashScreen.hide();

      if (splashScreen) {
        setTimeout(() => {
          splashScreen.hide();
        }, 100);


      };

      
      this.pages = [
        { title: 'Anasayfa', icon: 'home', component: HomePage, category: "0" },
        { title: 'Profilim', icon: 'md-contact', component: ProfilPage, category: "1" },
        { title: 'Kategoriler', icon: 'ios-apps', component: KategorilerPage, category: "2" },
        { title: 'Singraf Magazin', icon: 'ios-flower', component: HaberlerPage, category: "3" },
        { title: 'Video Yükle', icon: 'md-videocam', component: VideoYuklePage, category: "4" },
        { title: 'Haftanın Birincileri', icon: 'trophy', component: HaftaninBirincileriPage, category: "5" },
        { title: 'Hakkında', icon: 'ios-leaf', component: HakkindaPage, category: "6" },
        { title: ' SSS', icon: 'md-help', component: SssPage, category: "7" },
        { title: ' Çıkış Yap', icon: 'power', component: CikisPage, category: "7" }


      ];
      this.activePage = this.pages[8];
      ///****/// --------------------------------------------------------------
      var notificationOpenedCallback = function(jsonData) {
        
      };
  
      window["plugins"].OneSignal
        //birinci parametre ONE_SIGNAL_APP_ID, ikinici parametre GOOGLE PROJE NUMARASI
        .startInit("54fefc70-82d0-4a42-aea9-ed10af754f4c", "210975147575ioni")
        .endInit();

        window["plugins"].OneSignal.addSubscriptionObserver(function (state) {
          if (!state.from.subscribed && state.to.subscribed) {
            console.log("Subscribed for OneSignal push notifications!")
            // get player ID
            //alert(state.to.userId)
          }
          //console.log("Push Subscription state changed: " + JSON.stringify(state));
          //        .handleNotificationOpened(notificationOpenedCallback)
          //window.localStorage.setItem('PlayId',state.to.userId);
          //alert("ID Değeri: " +  window.localStorage.getItem('PlayId'));
          if (window.localStorage.getItem('PlayId') == null) {

            if(state.to.userId != null && window.localStorage.getItem('token') != null){
              this.playIdGonder(state.to.userId,window.localStorage.getItem('token'));
            }
            else if(state.to.userId != null){
              window.localStorage.setItem('PlayId',state.to.userId);
             
            }

          }26
          
        }); 
        ///****/// --------------------------------------------------------------
    });
    this.tokenuzunluk = window.localStorage.getItem('token');
    if(window.localStorage.getItem('token')){
      if (this.tokenuzunluk.length > 40) {
        this.rootPage = HomePage;
      }
      else{
        window.localStorage.removeItem('token');
        this.rootPage = LoginPage;
      }
    }
    window.localStorage.setItem('tekrar', '0');
   

    //#region Chat
    this.mesajGetir().subscribe(mesaj => {

      this.veritabani.kisiEkle(mesaj['kimden'], mesaj['kimden_id'], mesaj['profil']).then(res => {
        this.veritabani.mesajEkle(mesaj['kimden_id'], mesaj['MESSAGE'], '', true); 
        

      })
      this.nativeAudio.preloadSimple('bildirim', 'assets/imgs/mesaj.mp3');
      this.nativeAudio.play('bildirim');
      this.nativeAudio.setVolumeForComplexAsset('bildirim', 1);       
        this.localNotifications.schedule({
          id: 1,
          icon: mesaj['profil'],
          title:mesaj['kimden'],     
          text: mesaj['MESSAGE'],
          led: 'FF0000',
          sound: 'assets/imgs/mesaj.mp3',
        });
      
    });

    this.connectCheck().subscribe(mesaj => {
      this.veritabani.tekrarGonder().then(res => {
        this.dizi = res;
        this.uzunluk = this.dizi.length - 1;

        const element = this.dizi[this.uzunluk];
        let iid = element['ID'];
        let nname = element['NICKNAME'];
        let mymessage = element['MY_MESSAGE'];

        this.soket.emit('mesaj-gonder', {
          alici: nname,
          mesaj: mymessage
        });
        this.veritabani.otoSendGuncelle(iid);
        this.uzunluk--;
        //this.soket.emit('mesaj-dizi',this.dizi);
      });
    });

    this.reSend().subscribe(mesaj => {
      if (this.uzunluk !== -1) {
        const element = this.dizi[this.uzunluk];
        let iid = element['ID'];
        let nname = element['NICKNAME'];
        let mymessage = element['MY_MESSAGE'];

        this.soket.emit('mesaj-gonder', {
          alici: nname,
          mesaj: mymessage
        });
        this.veritabani.otoSendGuncelle(iid);
        this.uzunluk--;
      } else {
       
      }
    });
    //#endregion
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });
  }
  openPage(page) {
    this.activePage = page;
    this.nav.setRoot(page.component);
    this.activePage = page;
  }
  checkActivePage(page) {
    return page = this.activePage;

  }

  //#region ChatObserver
  mesajGetir() {
    let observable = new Observable(observer => {
      this.soket.on('mesaj', (data) => {
        observer.next(data);
      });
    })

    return observable;

  }

  connectCheck() {
    let observable = new Observable(observer => {
      this.soket.on('baglanti-callback', (data) => {
        observer.next(data);
      });
    })

    return observable;

  }

  reSend() {
    let observable = new Observable(observer => {
      this.soket.on('re-send', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }
  //#endregion

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
        
          window.localStorage.setItem('PlayId',play_id);
          window.localStorage.setItem('PlayIdCheck','1');
        }
        
      });
  }

}