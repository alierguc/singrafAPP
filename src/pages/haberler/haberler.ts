import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HabericerikPage} from '../habericerik/habericerik';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';


@IonicPage()
@Component({
  selector: 'page-haberler',
  templateUrl: 'haberler.html',
})
export class HaberlerPage {
  Haberler:any[];
  Id:any;
  resposeData:any;
  haberId:any;
  hId:any;
  veri:any[];
  noRecord:boolean;
  public kayitYoksa:boolean;
  public lottieConfig: Object
  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http,private nativePageTransitions: NativePageTransitions) {
    this.lottieConfig = {
      path: 'assets/imgs/homeload.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };
    this.noRecord =false;
    this.baslangic();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HaberlerPage');
  }
  
  icerikGit(ID)
  {
    
    this.navCtrl.push(HabericerikPage,{},{animate:true, animation:""});
    window.localStorage.setItem("haberId",ID)
    console.log(ID);
  }
 
 
  doInfinite(InfiniteScroll): Promise<any>
  {
  
    return new Promise((resolve) =>{
      setTimeout(()=>{
       
        const baseURL = 'https://ilkcandogan.com/haberler.php'; 
        this.http.get(baseURL+"?start="+this.hId)
        .map(res => res.json())
        .subscribe(res => {
          console.log(res);
          this.resposeData = res;          
          this.veri = this.resposeData.bilgi;
          if(this.resposeData.bilgi.ID !== null)
          {                   
            if(this.veri.length > 0){
              for (let index = 0; index < this.veri.length; index++) {
                  this.Haberler.push(this.veri[index]);                 
              }
            }
            else{
              this.noRecord = true;
            }                
          }
          
          this.hId = res.SON_ID;
          InfiniteScroll.complete();
         
        }, (err) => {
         
          
          
        });
       
       
      },4000);
     
    })
  }
 


 /*
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    setTimeout(() => {
      /// GGG1
        
        const baseURL = 'https://ilkcandogan.com/haberler.php';

        this.http.get(baseURL + "?start=" + this.hId)
          .map(res => res.json())
          .subscribe(res => {   
              console.log(res);
              this.resposeData = res;
              if(this.resposeData.bilgi){
                
                const yeniVeri = this.resposeData.bilgi;

                this.Haberler.push(yeniVeri[0]);
                this.Haberler.push(yeniVeri[1]);
                this.Haberler.push(yeniVeri[2]);
                this.Haberler.push(yeniVeri[3]);
                this.Haberler.push(yeniVeri[4]);
                this.Haberler.push(yeniVeri[5]);
                this.Haberler.push(yeniVeri[6]);
                this.Haberler.push(yeniVeri[7]);
                this.Haberler.push(yeniVeri[8]);
                this.Haberler.push(yeniVeri[9]);
                
              }
              infiniteScroll.complete();
              this.hId = res.SON_ID;
              
      
          }, (err) => {
           
          });
      ///GGG2

      console.log('Async operation has ended');
     
    }, 300);
  }
  */
  baslangic()
  {
    this.hId = 0;
    const baseURL = 'https://ilkcandogan.com/haberler.php'; 
   this.http.get(baseURL+"?start="+this.hId)
   .map(res => res.json())
   .subscribe(res => {
     console.log(res);
     this.Haberler =res.bilgi;
     this.hId = res.SON_ID;
     
   }, (err) => {
   
   });
   }

}

