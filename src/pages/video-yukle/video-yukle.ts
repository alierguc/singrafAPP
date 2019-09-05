import { Component,ViewChild } from '@angular/core';
import { IonicPage,NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { MediaCapture, CaptureError, MediaFile, CaptureVideoOptions } from '@ionic-native/media-capture';
import { Storage } from '@ionic/storage';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import {Http,Headers,RequestOptions,Response } from '@angular/http';
import {VideoYukleicerikPage} from '../video-yukleicerik/video-yukleicerik';


const MEDIA_FILES_KEY = 'mediaFiles';
@IonicPage()
@Component({
  selector: 'page-video-yukle',
  templateUrl: 'video-yukle.html',
})
export class VideoYuklePage {


  muzik_adi: string;
  yazar_adi: string;
  bilgi = { "muzik_adi": this.muzik_adi, "yazar_adi": this.yazar_adi };
  mediaFiles: string[];
  parameterL: string[];
  url: "https://kizilelmatr.com/video_yukle.php";

  CategoryId:any;
  idp:any;
  kategoriGetir:any;
  ///Eklendigim
  dizin: string;
  image:any;
  Nname:any;
  dizinBilgileri = { "dizin": this.dizin };
  ///Eklediğim

  @ViewChild('myvideo') myVideo: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, private mediaCapture: MediaCapture, private storage: Storage,
    private file: File, private media: Media, private transfer: FileTransfer, private loadingCtrl: LoadingController,
    private toastCtrl: ToastController, private http:Http) {
      this.kategoriYukle();
      this.image = window.localStorage.getItem("image");
      this.Nname = window.localStorage.getItem('n_name')
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
     
     
      const baseURL = 'https://ilkcandogan.com/muzik_kategorileri.php'; 
      this.http.get(baseURL)
      .map(res => res.json())
      .subscribe(res => {
        console.log(res);
        this.kategoriGetir = res.bilgi;   
        
        
  
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
            quality: 0.3,
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
                headers: { 'Authorization': localStorage.getItem('token') },
  
                /*   params:{muzik_adi:this.bilgi.muzik_adi,yazar_adi:this.bilgi.} */
  
              }
              /* muzik_adi,yazar_adi,kategori_id*/
              let encodeOptions = this.bilgi.muzik_adi + "&" +
              "yazar_adi=" + this.bilgi.yazar_adi + "&" + "kategori_id=";

              let lastEncodeUri = encodeURI(encodeOptions);

              let loader = this.loadingCtrl.create({
                content: "Yükleniyor"
              });
              loader.present();

              fileTransfer.upload(res.nativeURL, 'https://ilkcandogan.com/video_yukle.php?muzik_adi=' + lastEncodeUri+this.CategoryId, options1)
                .then((data) => {
                 
                  loader.dismiss();
                  window.localStorage.removeItem("idx");
                }, (err) => {
                 
                  // error
                  /*alert("error"+JSON.stringify(err)); */
                });
  
  
  
  
  
            }, err => {
              console.log('err: ', err);
            });
          },
            (err: CaptureError) => console.error(err));
        }
        catch{
          console.log(console.error());
  
        }
      }
      else {
        this.hata0();
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
    async hata0() {
      const toast = await this.toastCtrl.create({
        message: 'Müzik Adı veya Söz kısmını boş bırakmayınız.',
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
  
  
  
  