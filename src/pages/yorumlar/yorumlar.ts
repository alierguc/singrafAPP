import { Component, ɵConsole } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import {Http,Headers,RequestOptions,Response } from '@angular/http';
import {PopoverPage} from '../popover/popover';


@IonicPage()
@Component({
  selector: 'page-yorumlar',
  templateUrl: 'yorumlar.html',
})

export class YorumlarPage {
  PId : any;
  mId:any;
  sParam:any;
  comment:any;
  veri:any[];
  yanitla:any;
  kullaniciYorum:any[];
  diger = window.localStorage.getItem('idf');
  noRecord:boolean;
  public resposeData : any;
  SSID: any;
  users:any[];
  public lottieConfig: Object
  fakeUsers:Array<any> = new Array;
  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http,
  private loadingCtrl:LoadingController) {
    this.lottieConfig = {
      path: 'assets/imgs/commentskeleton.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
  };
    this.mId = navParams.get('mId');
    this.noRecord = false;
    this.cek();
    console.log(this.mId);
 
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad YorumlarPage');
  }
  cek()
  { 
    this.SSID = 0;
    const baseURL = 'https://ilkcandogan.com/video_yorumlar.php?muzik_id='; 

    let authHeader = JSON.stringify(window.localStorage.getItem('token'));
    let headersObj = new Headers();
    headersObj.append('Authorization', authHeader);

   this.http.get(baseURL + this.mId + "&start=" + this.SSID,{headers:headersObj})
   .map(res => res.json())
   .subscribe(res => {
     console.log(res);
     this.kullaniciYorum = res.comments;
     this.SSID = res.SON_ID;


    console.log(this.kullaniciYorum);
 
    
  
   }, (err) => {
 
     
   });
   }
   doInfinite(InfiniteScroll): Promise<any>
   {
   
     return new Promise((resolve) =>{
       setTimeout(()=>{
        
         const baseURL = 'https://ilkcandogan.com/video_yorumlar.php?muzik_id='; 
         let headersObj = new Headers();
         let authHeader = JSON.stringify(window.localStorage.getItem('token'));
         headersObj.append('Authorization', authHeader);
         this.http.get(baseURL + this.mId + "&start=" + this.SSID,{headers:headersObj})
         .map(res => res.json())
         .subscribe(res => {
           console.log(res);
           this.resposeData = res;          
           this.veri = this.resposeData.comments;
           if(this.resposeData.comments !== null)
           {                   
            if(this.veri.length > 0){
              for (let index = 0; index < this.veri.length; index++) {
                  this.kullaniciYorum.push(this.veri[index]);                 
              }
             }
             else{
               this.noRecord = true;
             }                
           }
           
           this.SSID = res.SON_ID;
           InfiniteScroll.complete();
          
         }, (err) => {
         
           
           
         });
        
        
       },4000);
      
     })
   }

   yorumYap()
   {
    let loader = this.loadingCtrl.create({
      content: "Yorumunuz Yükleniyor."
    });
    loader.present();
    const baseURL = 'https://ilkcandogan.com/'
    const baseParams = 'video_yorum_yap.php';

    let testURL = (baseURL+baseParams);
    let authHeader = JSON.stringify(window.localStorage.getItem('token'));
    let body = {
      "muzik_id":this.mId,
      "yorum":this.comment
    }
    let headersObj = new Headers();
    headersObj.append('Authorization', authHeader);
    this.http.post(testURL,body, {headers:headersObj})
      .map((res:Response) => res.json())
      .subscribe(res => {
        
        this.cek();
        loader.dismiss();
        this.comment = "";
        console.log(res);
        
   
      });

   }
   //#endregion
   presentPopover(myEvent, myEvent2,myEvent3) {
    this.PId = myEvent;
    this.navCtrl.push(PopoverPage, {
      idP: myEvent,
      Nickname: myEvent2,
      image:myEvent3

    });
  }
   commentYanitla(N_NAME)
   {
     const yComment ="@"+ N_NAME;
     this.comment = yComment;
   }

   Sil(COMMENT_ID)
   {
     
    let loader = this.loadingCtrl.create({
      content: "Yorumunuz Siliniyor."
    });
    loader.present();
    const yorum_id = COMMENT_ID;
    const sil ="1";

    const baseURL = 'https://ilkcandogan.com/'
    const baseParams = 'video_yorum_duzenle.php';

    let testURL = (baseURL+baseParams);
    let authHeader = window.localStorage.getItem('token');

    let headersObj = new Headers();
    headersObj.append('Authorization', authHeader);
    
    let body = {
      "yorum_id": yorum_id,
      "sil": sil
    }

    
    console.log(yorum_id);
    this.http.post(testURL,body, {headers:headersObj})
      .map((res:Response) => res.json())
      .subscribe(res => {

        this.cek();
        loader.dismiss();                                   
        console.log(res);
        
      });
    

   }
   
 
  
}

