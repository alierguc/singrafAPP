import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { PopoverPage } from '../popover/popover';

@IonicPage()
@Component({
  selector: 'page-haftanin-birincileri',
  templateUrl: 'haftanin-birincileri.html',
})
export class HaftaninBirincileriPage {
users:any;
veri:boolean;
PId:any;
uzunluk:any[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http) {
   this.haftaninVideolari();
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HaftaninBirincileriPage');
  }
  presentPopover(myEvent, myEvent2,myEvent3) {
    this.PId = myEvent;
    this.navCtrl.setRoot(PopoverPage, {
      idP: myEvent,
      Nickname: myEvent2,
      image:myEvent3

    });
  }
  haftaninVideolari()
  {
    const baseURL = 'https://ilkcandogan.com/birinciler.php';
    this.http.get(baseURL)
      .map(res => res.json())
      .subscribe(res => {
        console.log(res);
        this.users = res.bilgi;
        this.uzunluk = this.users;
        console.log("uzunluk"+this.uzunluk.length);
        if(this.uzunluk.length <1)
        {
          this.veri=true;
        }

      }, (err) => {
       
      });
  }
}
