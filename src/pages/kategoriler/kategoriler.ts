import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http} from '@angular/http';
import {KategoriicerilPage} from '../kategoriiceril/kategoriiceril';
/**
 * Generated class for the KategorilerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kategoriler',
  templateUrl: 'kategoriler.html',
})
export class KategorilerPage {
  public lottieConfig: Object
  kategoriler:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http) {
    this.lottieConfig = {
      path: 'assets/imgs/kategorilerskeleton.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };
    this.veriCek();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KategorilerPage');
  }
  getIstek(ID)
  {
    this.navCtrl.push(KategoriicerilPage);
    window.localStorage.setItem("kategoriid",ID)
    console.log(ID);
  }
  veriCek()
  {  
        
      
     
    const baseURL = 'https://ilkcandogan.com/muzik_kategorileri.php'; 
   this.http.get(baseURL)
   .map(res => res.json())
   .subscribe(res => {
     console.log(res);
    this.kategoriler = res.bilgi;
     
   }, (err) => {
     
   });
   }
  }

