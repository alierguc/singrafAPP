import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams , Navbar} from 'ionic-angular';
import { VeritabaniProvider } from '../../providers/veritabani/veritabani';
import { AdMobFree, AdMobFreeBannerConfig,AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';
import {ChatPage} from '../../pages/chat/chat';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';

/**
 * Generated class for the ChatRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html',
})
export class ChatRoomPage {

  kayitliMesajlar:any=[];
  a = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams,private veritabani: VeritabaniProvider,private admobFree: AdMobFree, private soket:Socket) {
    
    this.veritabani.kisiOku().then(data =>{
      this.kayitliMesajlar = data;
  });

  this.mesajGetir().subscribe(mesaj => {
    this.k();
  });

  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatRoomPage');
  }
  mesajIcerik(user_id,nname){
    this.navCtrl.push(ChatPage,{
      u_id: user_id,
      nickname: nname
    })
  }

  mesajGetir() {
    let observable = new Observable(observer => {
      this.soket.on('mesaj', (data) => {
        observer.next(data);
      });
    })
  
    return observable;
    
   }
   
   k(){
     
    this.veritabani.kisiOku().then(data =>{
      this.kayitliMesajlar = data;
      if(this.a === 0){
        this.k();
        this.a++;
      }
      
    });
   }

   sil(a,b){
    
      this.veritabani.kisiVeMesajSil(a,b).then(data =>{
        alert("data:" +JSON.stringify(data));
        this.veritabani.kisiOku().then(data =>{
          this.kayitliMesajlar = data;
      });      
    });

   }
}
