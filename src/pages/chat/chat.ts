import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VeritabaniProvider } from '../../providers/veritabani/veritabani';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  user_id: any;
  user_img: any;
  NICKNAME: any;
  mesajlar: any = [];
  MESAJ: any;
  status: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,
     private veritabani: VeritabaniProvider, private soket: Socket) {
      window.localStorage.setItem("kontrol","1");
      this.user_id = this.navParams.get('u_id');
      this.NICKNAME = this.navParams.get('nickname');
      this.user_img = this.navParams.get('u_img');

      this.status = false;
      this.veritabani.mesajOku(this.user_id).then(res => {
        this.mesajlar = res;
        
      });
  
      this.mesajGetir().subscribe(mesaj => {
        this.mesajlar.push(mesaj);
        this.veritabani.mesajOku(this.user_id).then(res => {
          this.mesajlar = res;
          this.veritabani.mesajOku(this.user_id).then(res => {
            this.mesajlar = res;
          })
        });
      });
  
      this.sendCheck().subscribe(mesaj => {
        this.status = mesaj['durum'];
        this.veritabani.durumGuncelle(this.user_id);
        this.status = false;
        this.veritabani.mesajOku(this.user_id).then(res => {
          this.mesajlar = res;
          this.veritabani.mesajOku(this.user_id).then(res => {
            this.mesajlar = res;
          });       
        });
      });
  
      this.reSend().subscribe(mesaj => {
        this.veritabani.mesajOku(this.user_id).then(res => {
          this.mesajlar = res;
          this.veritabani.mesajOku(this.user_id).then(res => {
            this.mesajlar = res;
          });       
        });
      });
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    console.log(this.user_id);
    console.log(this.NICKNAME);
  }
  mesajGetir() {
    let observable = new Observable(observer => {
      this.soket.on('mesaj', (data) => {
        observer.next(data);
      });
    })

    return observable;

  }

  mesajGonder() {
    if(typeof this.soket.connect().id !== 'undefined'){
      this.soket.emit('mesaj-gonder', {
        alici: this.NICKNAME,
        mesaj: this.MESAJ
      });
  
      var benimMesajim = {
        MY_MESSAGE: this.MESAJ,
        STATUS: false
      };
  
      this.mesajlar.push(benimMesajim);
      //this.veritabani.mesajEkle(this.user_id, '', benimMesajim.MY_MESSAGE, false); //sağdaki bizim mesajımız.
      
      this.veritabani.kisiEkle(this.NICKNAME, this.user_id, this.user_img).then(res => {
        this.veritabani.mesajEkle(this.user_id, '', benimMesajim.MY_MESSAGE, false); //sağdaki bizim mesajımız.
        this.MESAJ = "";
      })
    }else{
      
    }
    
    
  }

  sendCheck() {
    let observable = new Observable(observer => {
      this.soket.on('mesaj-callback', (data) => {
        observer.next(data);
      });
    })

    return observable;

  }
  
  reSend() {
    let observable = new Observable(observer => {
      this.soket.on('re-send', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }
}
