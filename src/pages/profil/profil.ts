import { Component, ɵConsole } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, 
  Platform, ActionSheetController, ModalController,AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { BioDuzenlePage } from '../bio-duzenle/bio-duzenle';
import {PresimonizlePage} from '../presimonizle/presimonizle';
import { PopupModalPage } from '../popup-modal/popup-modal';
import { NativeAudio } from '@ionic-native/native-audio';
import {MpCommentPage} from '../mp-comment/mp-comment';
import { AdMobFree,AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {

  resposeData: any;
  tumBilgiler: any;
  uBilgiler: any;
  uId: any;
  resim:any;
  record:any;
  bottomData: any;
  public lottieConfig: Object
  public lottieConfig2: Object
  public lottieConfig3: Object
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private camera: Camera,
    private transfer: FileTransfer, private loadingCtrl: LoadingController, public platform: Platform,
    public actionsheetCtrl: ActionSheetController, public modalCtrl: ModalController,private alertCtrl:AlertController,
    private nativeAudio:NativeAudio,private admobFree: AdMobFree ) {
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
      this.record = false;
    this.baslangic();
    this.lottieConfig3 = {
      path: 'assets/imgs/notfound.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
  };
    this.lottieConfig = {
      path: 'assets/imgs/homeload.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };
    this.lottieConfig2 = {
      path: 'assets/imgs/skeleton2.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };
  
  }
  


  yorumlar(myEvent, sParam) {
    this.navCtrl.push(MpCommentPage, {
      mId: myEvent,
      yanitla: sParam

    });
  }
  videoDuzenle(myEvent, myEvent2,
    myEvent3, myEvent4, myEvent5, myEvent6,
    myEvent7) {

    this.navCtrl.push(PopupModalPage, {
      musicId: myEvent,
      melodyName: myEvent2,
      categoryname:myEvent7,
      musicName: myEvent3,
      video: myEvent4,
      thumb: myEvent5,
      uploaddate: myEvent6

    });
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
  baslangic() {

    const Id = window.localStorage.getItem('idf');
    const baseURL = 'https://ilkcandogan.com/video_profil.php?id=';


    this.http.get(baseURL + Id)
      .map(res => res.json())
      .subscribe(res => {
        console.log(res);

        this.uBilgiler = res.profil;
        this.bottomData = res.video;
        window.localStorage.setItem("instagram",this.uBilgiler[0].INSTAGRAM);
        window.localStorage.setItem("twitter",this.uBilgiler[0].TWITTER);
        window.localStorage.setItem("facebook",this.uBilgiler[0].FACEBOOK);
        
        if(this.bottomData == 0)
        {
          this.record = true;
        }
        console.log(this.uBilgiler);
      }, (err) => {
       
      });
  }


  ionViewDidLoad() {
    
  }


  bioDuzenle() {
    this.navCtrl.push(BioDuzenlePage);

  }
  getImage() {
    const options: CameraOptions = {
      quality: 40,
      allowEdit:true,
      destinationType: this.camera.DestinationType.NATIVE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }
    
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      const fileTransfer: FileTransferObject = this.transfer.create();

      let options1: FileUploadOptions = {
        fileKey: 'image',
        chunkedMode: false,
        httpMethod: 'post',
        mimeType: "image/jpeg",
        fileName: 'name.jpg',
        headers: { 'Authorization': localStorage.getItem('token') },

      }

      let loader = this.loadingCtrl.create({
        content: "Profil Resminiz Değiştiriliyor."
      });
      loader.present();
      fileTransfer.upload(imageData, 'https://ilkcandogan.com/profil_duzenle.php', options1)
        .then((data) => {
          // success
          this.baslangic();
          loader.dismiss();
          
        }, (err) => {
          // error
        
        });


    });
  }

  pResmiKaldir() {
    let loader = this.loadingCtrl.create({
      content: "Profil Resminiz Kaldırılıyor."
    });
    loader.present();
    const baseURL = 'https://ilkcandogan.com/'
    const baseParams = 'profil_duzenle.php';

    let testURL = (baseURL + baseParams);
    let authHeader = window.localStorage.getItem('token');

    let headersObj = new Headers();
    headersObj.append('Authorization', authHeader);
    let body = {
      "image": "X"
    }

    this.http.post(testURL, body, { headers: headersObj })
      .map((res: Response) => res.json())
      .subscribe(res => {
        this.baslangic();
        loader.dismiss();
        this.resposeData = res;
        console.log(this.resposeData);



      });

  }
  cropImage() {
    const options: CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetWidth: 300,
      targetHeight: 300
    }

    this.camera.getPicture(options).then((imageData) => {


      const fileTransfer: FileTransferObject = this.transfer.create();

      let options1: FileUploadOptions = {
        fileKey: 'image',
        chunkedMode: false,
        httpMethod: 'post',
        mimeType: "image/jpeg",
        fileName: 'name.jpg',
        headers: { 'Authorization': localStorage.getItem('token') },

      }

      let loader = this.loadingCtrl.create({
        content: "Profil Resminiz Değiştiriliyor."
      });
      loader.present();
      fileTransfer.upload(imageData, 'https://ilkcandogan.com/profil_duzenle.php', options1)
        .then((data) => {
          // success    
          loader.dismiss();
          this.baslangic();
   
        }, (err) => {
          // error
         
        });


    });
  }
  cal()
  {
    this.nativeAudio.preloadSimple('bildirim', 'assets/imgs/mesaj.mp3');
    this.nativeAudio.play('bildirim');
  }
  presentConfirm(MUSIC_ID) {
    let alert = this.alertCtrl.create({
      message: 'Videonuzu Silmek İstediğinize Eminmisiniz ?',
      buttons: [
        {
          text: 'İptal',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Tamam',
          handler: () => {
            this.videoSil(MUSIC_ID);
          }
        }
      ]
    });
    alert.present();
  }
  videoSil(MUSIC_ID) {

    let loader = this.loadingCtrl.create({
      content: "İçeriğiniz Kaldırılıyor."
    });
    loader.present();
    const baseURL = 'https://ilkcandogan.com/'
    const baseParams = 'video_duzenle.php';

    let testURL = (baseURL + baseParams);
    let authHeader = window.localStorage.getItem('token');

    let headersObj = new Headers();
    headersObj.append('Authorization', authHeader);
    let body = {
      "sil": "1",
      "video_id": MUSIC_ID
    }

    this.http.post(testURL, body, { headers: headersObj })
      .map((res: Response) => res.json())
      .subscribe(res => {
        this.baslangic();
        loader.dismiss();
        this.resposeData = res;
        console.log(MUSIC_ID);
        console.log(this.resposeData);
      });
  }

  upload() {


    let options = {
      allowEdit:true,
      quality: 40,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {


      const fileTransfer: FileTransferObject = this.transfer.create();

      let options1: FileUploadOptions = {
        fileKey: 'image',
        chunkedMode: false,
        
        httpMethod: 'post',
        mimeType: "image/jpeg",
        fileName: 'name.jpg',
        headers: { 'Authorization': localStorage.getItem('token') },

      }

      let loader = this.loadingCtrl.create({
        content: "Profil Resminiz Değiştiriliyor."
      });
      loader.present();
      fileTransfer.upload(imageData, 'https://ilkcandogan.com/profil_duzenle.php', options1)
        .then((data) => {
          // success
          this.baslangic();
          loader.dismiss();
     
        }, (err) => {
          // error
          
        });


    });


  }
}


