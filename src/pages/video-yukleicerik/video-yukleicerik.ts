import { Component,ViewChild } from '@angular/core';
import {NgZone} from '@angular/core';
import { IonicPage,NavController, NavParams, LoadingController, ToastController, Alert } from 'ionic-angular';
import { MediaCapture, CaptureError, MediaFile, CaptureVideoOptions } from '@ionic-native/media-capture';
import { Storage } from '@ionic/storage';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import {Http,Headers,RequestOptions,Response } from '@angular/http';
import {HomePage} from '../home/home';
import { AdMobFree, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import {SimpleProgressBarProvider } from 'ionic-progress-bar';

const MEDIA_FILES_KEY = 'mediaFiles';
@IonicPage()
@Component({
  selector: 'page-video-yukleicerik',
  templateUrl: 'video-yukleicerik.html',
})
export class VideoYukleicerikPage {
  muzik_adi: string;
  yazar_adi: string;
  bilgi = { "muzik_adi": this.muzik_adi, "yazar_adi": this.yazar_adi };
  mediaFiles: string[];
  parameterL: string[];
  hataAyiklama:any;
  pbool:boolean;
  url: "https://kizilelmatr.com/video_yukle.php";
  videoData:any;
  CategoryId:any;
  idp:any;
  kategoriGetir:any;
  isenabled:boolean;
  ///Ekledigim
  dizin: string;
  image:any;
  Nname:any;
  progress:any;
  dizinBilgileri = { "dizin": this.dizin };
  ///Eklediğim

  @ViewChild('myvideo') myVideo: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, private mediaCapture: MediaCapture, private storage: Storage,
    private file: File, private media: Media, private transfer: FileTransfer, private loadingCtrl: LoadingController,
    private toastCtrl: ToastController, private http:Http,private admobFree:AdMobFree,public _zone: NgZone, private _progressBar: SimpleProgressBarProvider) {
      const insterstiteal: AdMobFreeInterstitialConfig = {

        id: "ca-app-pub-2851043339565426/2201081457",
        isTesting: false,
        autoShow: true
      };
      this.admobFree.interstitial.config(insterstiteal);
  
      this.admobFree.interstitial.prepare()
        .then(() => {
          // banner Ad is ready
          // if we set autoShow to false, then we will need to call the show method here
        })
        .catch(e => console.log(e));
      this.kategoriYukle();
      this.image = window.localStorage.getItem("image");
      this.Nname = window.localStorage.getItem('n_name');
      this.pbool = false;
      this.isenabled = false;
    }

    ionViewDidLoad() {
      this.storage.get(MEDIA_FILES_KEY).then(res => {
        this.mediaFiles = JSON.parse(res) || [];
      })
  
  
    }
    
    videoYukle()
    {
      this.navCtrl.push(VideoYukleicerikPage);
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
  
  
  showConfirmAlert(ID)
  {
     window.localStorage.setItem("idx",ID);
     this.CategoryId = window.localStorage.getItem("idx");
     
  }
  
  
  
    captureVideo(ID) {
      
      if (this.bilgi.muzik_adi != "" && this.bilgi.yazar_adi) {
        try {
          let options: CaptureVideoOptions = {
            quality: 1, /* 0.3*/
            limit: 1,
            duration: 90
          }
          this.mediaCapture.captureVideo(options).then((res: MediaFile[]) => {
            let capturedFile = res[0];
            let fileName = capturedFile.name;
            let dir = capturedFile['localURL'].split('/');
            dir.pop();
            let fromDirectory = dir.join('/');
            var toDirectory = this.file.dataDirectory;
  
            this.file.copyFile(fromDirectory, fileName, toDirectory, fileName).then((res) => {
              const fileTransfer: FileTransferObject = this.transfer.create();
              let options1: FileUploadOptions = {
                fileKey: 'video',
                chunkedMode: false,
                httpMethod: 'post',
                mimeType: "video/mp4",
                fileName: 'name.mp4',
                headers: { 
                  'Authorization': localStorage.getItem('token'),
                  'API_KEY':'15386b116a2a9e75fbd890841ed50aca'
                 },
  
                /*   params:{muzik_adi:this.bilgi.muzik_adi,yazar_adi:this.bilgi.} */
  
              }
              /* muzik_adi,yazar_adi,kategori_id*/
              let encodeOptions = this.bilgi.muzik_adi + "&" +
              "yazar_adi=" + this.bilgi.yazar_adi + "&" + "kategori_id=";

              let lastEncodeUri = encodeURI(encodeOptions);
/*
              let loader = this.loadingCtrl.create({
                content: "Yükleniyor"
              });
              loader.present();
              */
             fileTransfer.onProgress((progressEvent) => {
              this.pbool = true;
         
          var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
          this.progress = perc;
          });
              fileTransfer.upload(res.nativeURL, 'http://165.22.77.175/server2/video_yukle.php?muzik_adi=' + lastEncodeUri+this.CategoryId, options1)
                .then((data) => {
                 
                 this.videoData = JSON.parse(data.response);
                 
                
                  
               /*  loader.dismiss();*/
                  window.localStorage.removeItem("idx");
              
                  if(this.videoData.hata =="3")
                  {
                    this.hata0(); 
                  /*  loader.dismiss();*/
                   
                  }
                  if(this.videoData.hata =="0")
                  {
                    this.hata0();
                 /*   loader.dismiss();*/
                    this.navCtrl.setRoot(HomePage);
                  }
                  if(this.videoData.hata =="8")
                  {
                    this.hata8();
                 /*   loader.dismiss();*/
                  }
                }, (err) => {
                  this.hata3();
                  


                });
  
            }, err => {
              this.hata3();
            });
          },
            (err: CaptureError) => console.error(err));
        }
        catch{
          console.log(console.error());
  
        }
      }
      else {
        this.hata3();
      }
    }
  
    play(myFile) {
      try {
  
  
        if (myFile.name.indexOf('.mp4') > -1) {
          const audioFile: MediaObject = this.media.create(myFile.localURL);
          audioFile.play();
        } else {
  
          let path = this.file.dataDirectory + myFile.name;
          let url = path.replace(/^file:\/\//, '');
          let video = this.myVideo.nativeElement;
          video.src = url;
          this.upload();
          video.play();
        }
      }
      catch
      {
        console.log(console.error());
  
      }
    }
  
  
  
    storeMediaFiles(files) {
      try {
  
  
        this.storage.get(MEDIA_FILES_KEY).then(res => {
          if (res) {
            let arr = JSON.parse(res);
            arr = arr.concat(files);
            this.storage.set(MEDIA_FILES_KEY, JSON.stringify(arr));
          } else {
            this.storage.set(MEDIA_FILES_KEY, JSON.stringify(files))
          }
          this.mediaFiles = this.mediaFiles.concat(files);
  
        })
      }
      catch
      {
        console.log(console.error());
  
      }
    }
    async hata3() {
      const toast = await this.toastCtrl.create({
        message: 'Göndermeye çalıştığınız dosya bozuk veya kayıp.',
        duration: 2000
      });
      toast.present();
    }
    async hata8() {
      const toast = await this.toastCtrl.create({
        message: 'Video Bilgileriniz Eksik.',
        duration: 2000
      });
      toast.present();
    }
    async hata0() {
      const toast = await this.toastCtrl.create({
        message: 'Videonuz Başarıyla Yüklendi.',
        duration: 2000
      });
      toast.present();
    }
 
    upload() {
      const fileTransfer: FileTransferObject = this.transfer.create();
  
      let options1: FileUploadOptions = {
        fileKey: 'video',
        chunkedMode: false,
        httpMethod: 'post',
        mimeType: "video/mp4",
        fileName: 'name.mp4',
        headers: { 'Authorization': localStorage.getItem('token') },
  
      }
  
      fileTransfer.upload('mediaFiles [];', 'https://ilkcandogan.com/video_yukle.php', options1)
        .then((data) => {
          // success
    
        }, (err) => {
          // error
          
        });
  
  
    };
  
  
  }
  
