import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { PopoverPage } from '../popover/popover';

@IonicPage()
@Component({
  selector: 'page-likelist',
  templateUrl: 'likelist.html',
})


export class LikelistPage {
  begenenler: any;
  SSID: any;
  likeusers: any;
  resposeData:any;
  noRecord:boolean;
  listData:any;
  lottieControl:boolean;
  public lottieConfig2: Object
  public lottieConfig: Object
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    this.noRecord=false;
    this.lottieControl = false;
    this.begenenler = navParams.get('likepagemusicid');
    this.loading(this.begenenler);  
   
    this.lottieConfig2 = {
      path: 'assets/imgs/notfound.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };
    this.lottieConfig = {
      path: 'assets/imgs/like.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LikelistPage');
  }

  loading(begenenler) {

    this.SSID = 0;
    const baseURL = 'https://ilkcandogan.com/video_begenileri_getir.php';
    this.http.get(baseURL + "?muzik_id=" + begenenler + "&start="+this.SSID)
      .map(res => res.json())
      .subscribe(res => {
        console.log(res);
        this.likeusers = res.likedList;
        console.log(this.likeusers);
        this.SSID = res.SON_ID;
        if(this.SSID == null)
        {
          this.lottieControl = true;
        }



      }, (err) => {

      });


  }
  goProfile(myEvent, myEvent2,myEvent3) {
   
    this.navCtrl.push(PopoverPage, {
      idP: myEvent,
      Nickname: myEvent2,
      image:myEvent3

    });
  }
  doInfinite(InfiniteScroll): Promise<any>
  {
  
    return new Promise((resolve) =>{
      setTimeout(()=>{
       
        const baseURL = 'https://ilkcandogan.com/video_begenileri_getir.php'; 
        this.http.get(baseURL +"?muzik_id="+ this.begenenler + "&start=" + this.SSID)
        .map(res => res.json())
        .subscribe(res => {
          console.log(res);
          this.resposeData = res;          
          this.listData = this.resposeData.likedList;
          if(this.resposeData.likedList !== null)
          {                   
           if(this.listData.length > 0){
             for (let index = 0; index < this.listData.length; index++) {
                 this.likeusers.push(this.listData[index]);                 
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
}

