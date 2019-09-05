import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, Alert } from 'ionic-angular';
import {Http,Headers,RequestOptions,Response } from '@angular/http';
import { HomePage } from '../home/home';
import {ChatPage} from '../chat/chat';
import {FullScreenPage} from '../full-screen/full-screen';
import {PresimonizlePage} from '../presimonizle/presimonizle';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
};



  resposeData:any;
  tumBilgiler:any;
  uBilgiler:any;
  idP:any;
  nname:any;
  record:boolean;
  mesajName:any;
  bottomData:any;
  image:any;
  socialtwit:boolean;
  socialface:boolean;
  socialinsta:boolean;
  kisiN_name:any;
  diger = window.localStorage.getItem('f_name')
  public lottieConfig3: Object
  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http,private modalCtrl:ModalController,private iab: InAppBrowser) {
    this.socialinsta = false;
    this.socialface = false;
    this.socialtwit = false;
    this.record = false;
    this.idP = navParams.get('idP');
    this.nname = navParams.get('Nickname');
    this.image = navParams.get('image');
    this.lottieConfig3 = {
      path: 'assets/imgs/notfound.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
  };
   

    this.baslangic(this.idP);

  }

  ionViewDidLoad() {

  }
  instagram(url:string)
  {
    let endPoint = this.uBilgiler[0].INSTAGRAM;
    let startPoint = url + endPoint;
    let target = "_self";
    this.iab.create(startPoint,target,this.options);
  }
  facebook(url:string)
  { 
    let endPoint = this.uBilgiler[0].FACEBOOK;
    let startPoint = url + endPoint;
    let target = "_self";
    this.iab.create(startPoint,target,this.options);
  }
  twitter(url:string)
  {
    let endPoint = this.uBilgiler[0].TWITTER;
    let startPoint = url + endPoint;
    let target = "_self";
    this.iab.create(startPoint,target,this.options);
  }
  presimizle(event1) {
    this.openModal(PresimonizlePage,{
      resim:event1
    });
  }
  openModal(pageName,event1) {
    this.modalCtrl.create(pageName, event1 ,{ cssClass: 'inset-modal' })
                  .present();
  }
  fimage()
  {
    this.navCtrl.push(FullScreenPage);
  }
  mesajG(user_img)
  {
    this.navCtrl.push(ChatPage,{
      nickname: this.nname,
      u_id:this.idP,
      u_img: this.image
      });
      

  }

 
  baslangic(idP)
  {
    const baseURL = 'https://ilkcandogan.com/video_profil.php?id=';
    
 
   this.http.get(baseURL+idP)
   .map(res => res.json())
   .subscribe(res => {
     console.log(res);
  
    this.uBilgiler = res.profil;
    
    this.bottomData = res.video;

    if(this.uBilgiler[0].INSTAGRAM == null)
    {
      this.socialinsta = true;
    }
    if(this.uBilgiler[0].FACEBOOK == null)
    {
      this.socialface = true;
    }
    if(this.uBilgiler[0].TWITTER == null)
    {
      this.socialtwit = true;
    }

    if(this.bottomData == 0)
        {
          this.record = true;
        }
     console.log(this.uBilgiler);
   }, (err) => {
  
   });
   }
}
