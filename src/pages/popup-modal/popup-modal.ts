import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import {Http,Headers,RequestOptions,Response } from '@angular/http';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-popup-modal',
  templateUrl: 'popup-modal.html',
})
export class PopupModalPage {
  sarkiadi:any;
  muzik_adi:any;
  tur:any;
  Kategori_id:any;
  bilgi = { "muzik_adi": this.muzik_adi, "muzik_yazar": this.sarkiadi};
  mId:any;
  meName:any;
  hataKontrol:any;
  muName:any;
  video:any;
  catname:any;
  kategoriGetir:any;
  thumb:any;
  uploaddate:any;
  CategoryId:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http:Http,private loadingCtrl:LoadingController,private toastCtrl:ToastController) {
    this.mId = navParams.get('musicId');
    this.meName = navParams.get('melodyName');
    this.muName = navParams.get('musicName');
    this.video = navParams.get('video');
    this.thumb = navParams.get('thumb');
    this.catname = navParams.get('categoryname');
    this.uploaddate = navParams.get('uploaddate');
    this.kategoriYukle();
    console.log(this.mId);
    console.log(this.meName);
    console.log(this.muName);
    console.log(this.video);
    console.log(this.thumb);
    console.log(this.uploaddate);
    console.log(this.catname);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopupModalPage');
  }
  showConfirmAlert(ID) {
    window.localStorage.setItem("idx", ID);
    this.CategoryId = window.localStorage.getItem("idx");
    console.log(this.CategoryId);
  }
  async hata0() {
    const toast = await this.toastCtrl.create({
      message: 'İçeriğiniz başarıyla güncellendi.',
      duration: 2000
    });
    toast.present();
  }
  async hata1() {
    const toast = await this.toastCtrl.create({
      message: 'Beklenmeyen bir hata oluştu.',
      duration: 2000
    });
    toast.present();
  }
  async kontrol() {
    const toast = await this.toastCtrl.create({
      message: '"Müzik adı" ve "Söz yazarı" kısmını boş bırakmayınız.',
      duration: 2000
    });
    toast.present();
  }
  Yolla(ID)
  { 
    let loader = this.loadingCtrl.create({
    content: "İçeriğiniz değiştiriliyor"
  });  
  loader.present();
   if(this.bilgi.muzik_adi != null && this.bilgi.muzik_yazar != null)
   {
    const baseURL = 'https://ilkcandogan.com/'
    const baseParams = 'video_duzenle.php';
   


    const body ={
      "video_id":encodeURI(this.mId),
      "muzik_adi":encodeURI(this.bilgi.muzik_adi),
      "muzik_yazar":encodeURI(this.bilgi.muzik_yazar),
      "kategori_id":this.CategoryId
    } 
    
    let testURL = (baseURL+baseParams);
    let authHeader = window.localStorage.getItem('token');

    let headersObj = new Headers();
    headersObj.append('Authorization', authHeader);
    
    this.http.post(testURL,body, {headers:headersObj})
      .map((res:Response) => res.json())
      .subscribe(res => {
        this.hataKontrol = res;
        
        if(this.hataKontrol["hata"] == "0")
        {
         this.hata0();
         loader.dismiss();
         this.navCtrl.setRoot(HomePage);

        }
        else if(this.hataKontrol["hata"] == "1")
        {
          this.hata1();
          loader.dismiss();
        }
        else if(this.hataKontrol["hata"] == "2")
        {
          this.hata1();
          loader.dismiss();
        }
        else{
          this.hata1();
          loader.dismiss();
        }
        console.log(res);
      });
    
    }
    else
    {
      this.kontrol();
      loader.dismiss();
    }

  }
  kategoriYukle()
  {
    let loader = this.loadingCtrl.create({
      content: "Yükleniyor"
    });  
    loader.present();
    const baseURL = 'https://ilkcandogan.com/muzik_kategorileri.php'; 
    this.http.get(baseURL)
    .map(res => res.json())
    .subscribe(res => {
      console.log(res);
      this.kategoriGetir = res.bilgi;   
      loader.dismiss();
      

  });
}
}
