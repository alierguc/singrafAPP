import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { Injectable } from '@angular/core';

@Injectable()
export class VeritabaniProvider {

  veritabani: SQLiteObject;
  mesajID: string;
  constructor(private sqlite: SQLite) {

    this.sqlite.create({
      name: 'cantografDB',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.veritabani = db;
      db.executeSql('CREATE TABLE IF NOT EXISTS tb_kisi(ID INTEGER PRIMARY KEY AUTOINCREMENT, NICKNAME TEXT, NICKNAME_ID INTEGER,IMG TEXT)', [])
        .then(() => console.log('tb_kisi: kod çalıştı')).catch(e => console.log(JSON.stringify(e + " tb_kisi create hatası")));

      db.executeSql("CREATE TABLE IF NOT EXISTS tb_mesaj(ID INTEGER PRIMARY KEY AUTOINCREMENT, USER_ID INTEGER, MESSAGE TEXT, MY_MESSAGE TEXT,STATUS TEXT, DATE DATETIME DEFAULT (STRFTIME('%H:%M', 'NOW','localtime')))", [])
        .then(() => console.log('tb_mesaj: kod çalıştı')).catch(e => console.log(JSON.stringify(e + " tb_mesaj create hatası")));

    }).catch(e => console.log(JSON.stringify(e) + " çalışma hatası"));


  }


  kisiEkle(nickname: any, nickname_id: any, img: any) {
    let data = [nickname, nickname_id, img];
    let varMi: any;
    var sorgu: any;
    sorgu = 'SELECT ID from tb_kisi where NICKNAME_ID=' + nickname_id;
    return this.veritabani.executeSql(sorgu, []).then(res => {
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          varMi = 200;
        }
      }
      else{
        this.veritabani.executeSql('INSERT INTO tb_kisi(NICKNAME,NICKNAME_ID,IMG) VALUES(?,?,?)', data);
      }
      return res;
    }).catch(e => console.log(JSON.stringify(e)+" kisi ekleme hatası." ));

  }

  mesajEkle(user_id: any, message: any, my_message: any, status: boolean) {
    let data = [user_id, message, my_message, status];
    return this.veritabani.executeSql('INSERT INTO tb_mesaj(USER_ID,MESSAGE,MY_MESSAGE,STATUS) VALUES(?,?,?,?)', data)
      .then(res => {
        return res;
      })
      .catch(e => console.log(JSON.stringify(e + " mesaj ekleme hatası.")));
  }
  mesajSil() {
    this.veritabani.executeSql('DELETE FROM tb_mesaj',[]);
    return this.veritabani.executeSql('DELETE FROM tb_kisi',[])
      .then(res => {
        return res;
      })
      .catch(e => console.log(JSON.stringify(e )+"mesaj silme hatası"));
  }

  mesajOku(user_id) {
    var sorgu: string; //SEND sildim.
    sorgu = "SELECT * FROM tb_mesaj WHERE USER_ID=" + user_id;
    return this.veritabani.executeSql(sorgu, []).then(res => {
      let data = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {


          data.push({
            DATE: res.rows.item(i).DATE,
            MESSAGE: res.rows.item(i).MESSAGE,
            MY_MESSAGE: res.rows.item(i).MY_MESSAGE,
            STATUS: res.rows.item(i).STATUS
          })
        }
      }
      return data;
    }).catch(e => console.log(JSON.stringify(e) + 'mesaj okuma hatası'));
  }


  kisiOku() {
    var sorgu: string;
    sorgu = "SELECT DISTINCT NICKNAME, * FROM tb_kisi ORDER BY ID DESC";
    return this.veritabani.executeSql(sorgu, []).then(res => {
      let data = [];
      let k_data = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          k_data.push({
            NICKNAME: res.rows.item(i).NICKNAME
          });
  
          if(k_data.indexOf(res.rows.item(i).NICKNAME) == -1){
            data.push({
              ID: res.rows.item(i).ID,
              NICKNAME: res.rows.item(i).NICKNAME,
              NICKNAME_ID: res.rows.item(i).NICKNAME_ID,
              IMG: res.rows.item(i).IMG,
              USER_ID: res.rows.item(i).USER_ID
            })
          }

        }
        
      }
      //alert(JSON.stringify(data));
      return data;
    }).catch(e => console.log(JSON.stringify(e) + 'kisi okuma hatası'));
  }

  durumGuncelle(user_id: any) {
    var sorgu: string;
    sorgu = 'SELECT MAX(ID) AS ID FROM tb_mesaj WHERE USER_ID=' + user_id;
    return this.veritabani.executeSql(sorgu, []).then(res => {
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          this.mesajID = res.rows.item(i).ID;
          var sorgu2: string;
          sorgu2 = "UPDATE tb_mesaj SET STATUS = 'true' WHERE ID =" + this.mesajID;
          this.veritabani.executeSql(sorgu2, [])
            .then(res => {
              return res;
            })
            .catch(e => console.log(JSON.stringify(e) + " durum güncelleme hatası."));
        }

      }

    }).catch(e => console.log(JSON.stringify(e + " durum select hatası.")));

  }

  tekrarGonder() {
    var sorgu: string;
    sorgu = "SELECT tb_mesaj.ID, tb_kisi.NICKNAME, tb_mesaj.MY_MESSAGE, tb_mesaj.STATUS FROM tb_mesaj left join tb_kisi ON tb_mesaj.USER_ID = tb_kisi.NICKNAME_ID WHERE STATUS = 'false' ORDER BY tb_mesaj.ID DESC";
    return this.veritabani.executeSql(sorgu, []).then(res => {
      let data = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          data.push({
            ID: res.rows.item(i).ID,
            NICKNAME: res.rows.item(i).NICKNAME,
            MY_MESSAGE: res.rows.item(i).MY_MESSAGE,
            STATUS: res.rows.item(i).STATUS
          })
        }
      }
      return data;
    }).catch(e => console.log(JSON.stringify(e) + 'tekrar gonder hatası'));

  }
  otoSendGuncelle(mesaj_id:any){
    var sorgu: string;
    sorgu ="UPDATE tb_mesaj SET STATUS = 'true' WHERE ID =" + mesaj_id;
    return this.veritabani.executeSql(sorgu, []).then(res => {
      return res;
    }).catch(e => console.log(JSON.stringify(e) + 'otoSend güncelleme hatası'));
  }

  kisiVeMesajSil(nickname_id:any,user_id: any){
      var sorgu: string;
      var sorgu2: string;

      sorgu = "DELETE FROM tb_kisi WHERE NICKNAME_ID ="+ nickname_id;
      sorgu2 = "DELETE FROM tb_mesaj WHERE USER_ID ="+ user_id;
      

    this.veritabani.executeSql(sorgu,[]);
    return this.veritabani.executeSql(sorgu2,[])
      .then(res => {
        return res;
      });

  }

}
