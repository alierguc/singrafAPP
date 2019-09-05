webpackJsonp([27],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_veritabani_veritabani__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng_socket_io__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng_socket_io__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChatPage = /** @class */ (function () {
    function ChatPage(navCtrl, navParams, veritabani, soket) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.veritabani = veritabani;
        this.soket = soket;
        this.mesajlar = [];
        window.localStorage.setItem("kontrol", "1");
        this.user_id = this.navParams.get('u_id');
        this.NICKNAME = this.navParams.get('nickname');
        this.user_img = this.navParams.get('u_img');
        this.status = false;
        this.veritabani.mesajOku(this.user_id).then(function (res) {
            _this.mesajlar = res;
        });
        this.mesajGetir().subscribe(function (mesaj) {
            _this.mesajlar.push(mesaj);
            _this.veritabani.mesajOku(_this.user_id).then(function (res) {
                _this.mesajlar = res;
                _this.veritabani.mesajOku(_this.user_id).then(function (res) {
                    _this.mesajlar = res;
                });
            });
        });
        this.sendCheck().subscribe(function (mesaj) {
            _this.status = mesaj['durum'];
            _this.veritabani.durumGuncelle(_this.user_id);
            _this.status = false;
            _this.veritabani.mesajOku(_this.user_id).then(function (res) {
                _this.mesajlar = res;
                _this.veritabani.mesajOku(_this.user_id).then(function (res) {
                    _this.mesajlar = res;
                });
            });
        });
        this.reSend().subscribe(function (mesaj) {
            _this.veritabani.mesajOku(_this.user_id).then(function (res) {
                _this.mesajlar = res;
                _this.veritabani.mesajOku(_this.user_id).then(function (res) {
                    _this.mesajlar = res;
                });
            });
        });
    }
    ChatPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChatPage');
        console.log(this.user_id);
        console.log(this.NICKNAME);
    };
    ChatPage.prototype.mesajGetir = function () {
        var _this = this;
        var observable = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observer) {
            _this.soket.on('mesaj', function (data) {
                observer.next(data);
            });
        });
        return observable;
    };
    ChatPage.prototype.mesajGonder = function () {
        var _this = this;
        if (typeof this.soket.connect().id !== 'undefined') {
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
            this.veritabani.kisiEkle(this.NICKNAME, this.user_id, this.user_img).then(function (res) {
                _this.veritabani.mesajEkle(_this.user_id, '', benimMesajim.MY_MESSAGE, false); //sağdaki bizim mesajımız.
                _this.MESAJ = "";
            });
        }
        else {
        }
    };
    ChatPage.prototype.sendCheck = function () {
        var _this = this;
        var observable = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observer) {
            _this.soket.on('mesaj-callback', function (data) {
                observer.next(data);
            });
        });
        return observable;
    };
    ChatPage.prototype.reSend = function () {
        var _this = this;
        var observable = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observer) {
            _this.soket.on('re-send', function (data) {
                observer.next(data);
            });
        });
        return observable;
    };
    ChatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-chat',template:/*ion-inline-start:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\chat\chat.html"*/'<ion-header>\n  <ion-navbar color="dark">\n    <ion-title>\n      Singapp Messenger\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <ion-grid>\n    <ion-row *ngFor="let mesaj of mesajlar">\n\n      <ion-col col-9 *ngIf="mesaj.MY_MESSAGE === \'\'" class="message">\n        <span style="color:white">{{ mesaj.MESSAGE }}</span>\n        <div class="time" style="color:rgba(255, 255, 255, 0.712)"><strong>{{mesaj.DATE}}</strong></div>\n      </ion-col>\n\n      <ion-col offset-3 col-9 *ngIf="mesaj.MY_MESSAGE !== \'\'" class="other_message">\n        <span style="color:white">{{ mesaj.MY_MESSAGE }}</span>\n        <!-- <div style="height:6px;width:6px;background-color:white;" *ngIf=\'mesaj.STATUS === "true"\'></div>-->\n        <div class="time" style="color:rgba(255, 255, 255, 0.712)"><strong>{{mesaj.DATE}}</strong></div>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n    <ion-row>\n      <ion-col col-9>\n        <ion-item no-lines>\n          <ion-input type="text" placeholder="Mesaj yaz..." [(ngModel)]="MESAJ"></ion-input>\n        </ion-item>\n      </ion-col>\n      <ion-col col-3>\n        <button ion-button clear color="primary" (click)="mesajGonder()" [disabled]="mesaj === \'\'">\n          Gönder\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\chat\chat.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_veritabani_veritabani__["a" /* VeritabaniProvider */], __WEBPACK_IMPORTED_MODULE_4_ng_socket_io__["Socket"]])
    ], ChatPage);
    return ChatPage;
}());

//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__bio_duzenle_bio_duzenle__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__presimonizle_presimonizle__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__popup_modal_popup_modal__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_native_audio__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__mp_comment_mp_comment__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_admob_free__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var ProfilPage = /** @class */ (function () {
    function ProfilPage(navCtrl, navParams, http, camera, transfer, loadingCtrl, platform, actionsheetCtrl, modalCtrl, alertCtrl, nativeAudio, admobFree) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.camera = camera;
        this.transfer = transfer;
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.actionsheetCtrl = actionsheetCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.nativeAudio = nativeAudio;
        this.admobFree = admobFree;
        var insterstiteal = {
            id: "ca-app-pub-2851043339565426/2201081457",
            isTesting: false,
            autoShow: true
        };
        this.admobFree.interstitial.config(insterstiteal);
        this.admobFree.interstitial.prepare()
            .then(function () {
            // banner Ad is ready
            // if we set autoShow to false, then we will need to call the show method here
        })
            .catch(function (e) { return console.log(e); });
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
    ProfilPage.prototype.yorumlar = function (myEvent, sParam) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__mp_comment_mp_comment__["a" /* MpCommentPage */], {
            mId: myEvent,
            yanitla: sParam
        });
    };
    ProfilPage.prototype.videoDuzenle = function (myEvent, myEvent2, myEvent3, myEvent4, myEvent5, myEvent6, myEvent7) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__popup_modal_popup_modal__["a" /* PopupModalPage */], {
            musicId: myEvent,
            melodyName: myEvent2,
            categoryname: myEvent7,
            musicName: myEvent3,
            video: myEvent4,
            thumb: myEvent5,
            uploaddate: myEvent6
        });
    };
    ProfilPage.prototype.presimizle = function (event1) {
        this.openModal(__WEBPACK_IMPORTED_MODULE_6__presimonizle_presimonizle__["a" /* PresimonizlePage */], {
            resim: event1
        });
    };
    ProfilPage.prototype.openModal = function (pageName, event1) {
        this.modalCtrl.create(pageName, event1, { cssClass: 'inset-modal' })
            .present();
    };
    ProfilPage.prototype.baslangic = function () {
        var _this = this;
        var Id = window.localStorage.getItem('idf');
        var baseURL = 'https://ilkcandogan.com/video_profil.php?id=';
        this.http.get(baseURL + Id)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res);
            _this.uBilgiler = res.profil;
            _this.bottomData = res.video;
            window.localStorage.setItem("instagram", _this.uBilgiler[0].INSTAGRAM);
            window.localStorage.setItem("twitter", _this.uBilgiler[0].TWITTER);
            window.localStorage.setItem("facebook", _this.uBilgiler[0].FACEBOOK);
            if (_this.bottomData == 0) {
                _this.record = true;
            }
            console.log(_this.uBilgiler);
        }, function (err) {
        });
    };
    ProfilPage.prototype.ionViewDidLoad = function () {
    };
    ProfilPage.prototype.bioDuzenle = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__bio_duzenle_bio_duzenle__["a" /* BioDuzenlePage */]);
    };
    ProfilPage.prototype.getImage = function () {
        var _this = this;
        var options = {
            quality: 40,
            allowEdit: true,
            destinationType: this.camera.DestinationType.NATIVE_URI,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            var fileTransfer = _this.transfer.create();
            var options1 = {
                fileKey: 'image',
                chunkedMode: false,
                httpMethod: 'post',
                mimeType: "image/jpeg",
                fileName: 'name.jpg',
                headers: { 'Authorization': localStorage.getItem('token') },
            };
            var loader = _this.loadingCtrl.create({
                content: "Profil Resminiz Değiştiriliyor."
            });
            loader.present();
            fileTransfer.upload(imageData, 'https://ilkcandogan.com/profil_duzenle.php', options1)
                .then(function (data) {
                // success
                _this.baslangic();
                loader.dismiss();
            }, function (err) {
                // error
            });
        });
    };
    ProfilPage.prototype.pResmiKaldir = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Profil Resminiz Kaldırılıyor."
        });
        loader.present();
        var baseURL = 'https://ilkcandogan.com/';
        var baseParams = 'profil_duzenle.php';
        var testURL = (baseURL + baseParams);
        var authHeader = window.localStorage.getItem('token');
        var headersObj = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headersObj.append('Authorization', authHeader);
        var body = {
            "image": "X"
        };
        this.http.post(testURL, body, { headers: headersObj })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.baslangic();
            loader.dismiss();
            _this.resposeData = res;
            console.log(_this.resposeData);
        });
    };
    ProfilPage.prototype.cropImage = function () {
        var _this = this;
        var options = {
            quality: 40,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false,
            allowEdit: true,
            targetWidth: 300,
            targetHeight: 300
        };
        this.camera.getPicture(options).then(function (imageData) {
            var fileTransfer = _this.transfer.create();
            var options1 = {
                fileKey: 'image',
                chunkedMode: false,
                httpMethod: 'post',
                mimeType: "image/jpeg",
                fileName: 'name.jpg',
                headers: { 'Authorization': localStorage.getItem('token') },
            };
            var loader = _this.loadingCtrl.create({
                content: "Profil Resminiz Değiştiriliyor."
            });
            loader.present();
            fileTransfer.upload(imageData, 'https://ilkcandogan.com/profil_duzenle.php', options1)
                .then(function (data) {
                // success    
                loader.dismiss();
                _this.baslangic();
            }, function (err) {
                // error
            });
        });
    };
    ProfilPage.prototype.cal = function () {
        this.nativeAudio.preloadSimple('bildirim', 'assets/imgs/mesaj.mp3');
        this.nativeAudio.play('bildirim');
    };
    ProfilPage.prototype.presentConfirm = function (MUSIC_ID) {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: 'Videonuzu Silmek İstediğinize Eminmisiniz ?',
            buttons: [
                {
                    text: 'İptal',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Tamam',
                    handler: function () {
                        _this.videoSil(MUSIC_ID);
                    }
                }
            ]
        });
        alert.present();
    };
    ProfilPage.prototype.videoSil = function (MUSIC_ID) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "İçeriğiniz Kaldırılıyor."
        });
        loader.present();
        var baseURL = 'https://ilkcandogan.com/';
        var baseParams = 'video_duzenle.php';
        var testURL = (baseURL + baseParams);
        var authHeader = window.localStorage.getItem('token');
        var headersObj = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headersObj.append('Authorization', authHeader);
        var body = {
            "sil": "1",
            "video_id": MUSIC_ID
        };
        this.http.post(testURL, body, { headers: headersObj })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.baslangic();
            loader.dismiss();
            _this.resposeData = res;
            console.log(MUSIC_ID);
            console.log(_this.resposeData);
        });
    };
    ProfilPage.prototype.upload = function () {
        var _this = this;
        var options = {
            allowEdit: true,
            quality: 40,
            correctOrientation: true
        };
        this.camera.getPicture(options).then(function (imageData) {
            var fileTransfer = _this.transfer.create();
            var options1 = {
                fileKey: 'image',
                chunkedMode: false,
                httpMethod: 'post',
                mimeType: "image/jpeg",
                fileName: 'name.jpg',
                headers: { 'Authorization': localStorage.getItem('token') },
            };
            var loader = _this.loadingCtrl.create({
                content: "Profil Resminiz Değiştiriliyor."
            });
            loader.present();
            fileTransfer.upload(imageData, 'https://ilkcandogan.com/profil_duzenle.php', options1)
                .then(function (data) {
                // success
                _this.baslangic();
                loader.dismiss();
            }, function (err) {
                // error
            });
        });
    };
    ProfilPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-profil',template:/*ion-inline-start:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\profil\profil.html"*/'<ion-header>\n  <ion-navbar color="dark">\n    <button ion-button menuToggle style="margin-top:6%;">\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title center style="margin-top:6%;">Profilim</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<div class="canvasi" *ngIf="!uBilgiler">\n  <lottie-animation-view *ngIf="!uBilgiler" [options]="lottieConfig" [width]="300" [height]="300">\n  </lottie-animation-view>\n</div>\n<div class="canvasi" *ngIf="!uBilgiler">\n  <lottie-animation-view *ngIf="!uBilgiler" [options]="lottieConfig" [width]="300" [height]="300">\n  </lottie-animation-view>\n</div>\n\n\n\n\n<ion-content *ngFor="let user of uBilgiler">\n  <!---->\n  <div></div>\n  <div id="profile-bg"></div>\n\n  <div id="content">\n    <ion-fab right top>\n      <button ion-fab fab-mini-size color="dark">\n        <ion-icon name="settings"></ion-icon>\n      </button>\n      <ion-fab-list side="bottom">\n        <button ion-fab (click)="upload()">\n          <ion-icon name="ios-camera"></ion-icon>\n        </button>\n        <button ion-fab (click)="bioDuzenle()">\n          <ion-icon name="ios-contact"></ion-icon>\n        </button>\n        <button ion-fab (click)="getImage()">\n          <ion-icon name="ios-images"></ion-icon>\n        </button>\n        <button ion-fab (click)="pResmiKaldir()">\n          <ion-icon name="ios-trash"></ion-icon>\n        </button>\n      </ion-fab-list>\n    </ion-fab>\n    <div id="profile-info">\n\n      <img id="profile-image" src="{{user.IMAGE}}" (click)="presimizle(user.IMAGE)">\n\n\n      <h3 id="profile-name">{{user.N_NAME}}</h3>\n      <span id="profile-description">@{{user.F_NAME2}}_{{user.L_NAME2}}</span>\n\n      <p></p>\n      <ion-icon name="md-rose" color="dark"></ion-icon> <span id="profile-description"><strong>Doğum Tarihi :\n          {{user.B_DATE}}</strong></span>\n\n      <br>\n      <br>\n      <ion-icon name="ios-heart" color="dark"></ion-icon> <span id="profile-description"><strong>Toplam Beğeni :\n          {{user.SCORE}}</strong></span>\n\n      <br>\n      <br>\n      <ion-icon name="pin" color="dark"></ion-icon> <span\n        id="profile-description"><strong>Şehir : {{user.CITY}}</strong></span>\n      <br>\n      <br>\n      \n      <ion-icon name="md-egg" color="favorite"></ion-icon> <span id="profile-description"><strong>Coin :\n          {{user.COIN}}</strong></span>\n      \n      <br>\n\n    </div>\n    <div style="margin-top: 20px;"></div>\n  </div>\n  <ion-card style="margin-top: 30px;">\n    <div style="padding-left:7px; padding-right:7px;margin-top: 15px;">\n      <div>\n        <h1 style="text-align:center;">Biyografi</h1>\n        <br>\n        <p style="text-align:center; padding-left:4%; padding-right:4%;">{{user.BIO}}</p>\n      </div>\n    </div>\n    <br>\n  </ion-card>\n  <ion-title color="dark">\n    <p style="text-align:center; color: #ce0e0e;">Yüklenen Videolar</p>\n  </ion-title>\n  <div class="canvasi" *ngIf="record">\n    <lottie-animation-view *ngIf="record" [options]="lottieConfig3" [width]="300" [height]="400">\n    </lottie-animation-view>\n  </div>\n  <p *ngIf="record" style="font-size: 16px; color:#ce0e0e; width:100%; text-align:center;">Kullanıcının içeriği\n    bulunamamaktadır</p>\n    <autoplay-content>\n  <ion-card *ngFor="let user of bottomData">\n    <ion-item>\n      <br>\n      <h2 (click)="presentPopover(user.USER_ID)">{{user.N_NAME}}</h2>\n      <button ion-button item-end outline style="margin-right: 25px;">\n        <ion-icon name="md-create" (click)="videoDuzenle(user.MUSIC_ID,\n        user.MELODY_NAME_SURNAME,user.MUSIC_NAME,user.VIDEO,user.THUMB,user.UPLOAD_DATE,\n        user.CATEGORY_NAME)"></ion-icon>\n      </button>\n      <button ion-button item-end outline (click)="presentConfirm(user.MUSIC_ID)">\n        <ion-icon name="ios-trash"></ion-icon>\n      </button>\n      <p><span>Söz Müzik :</span> <b><span>{{user.MELODY_NAME_SURNAME}}</span></b></p>\n      <br>\n      <p><span>Şarkı Adı :</span> <b><span>{{user.MUSIC_NAME}}</span></b></p>\n      <br>\n      <p><span>Tür :</span> <b><span>{{user.CATEGORY_NAME}}</span></b></p>\n    </ion-item>\n    <div>\n      <video width="900" height="180" poster="{{user.THUMB}}">\n        <source src="{{user.VIDEO}}" type="video/mp4">\n        Videonuz Yüklenemiyor\n      </video>\n    </div>\n    <ion-card-content>\n      <p><b><span>Yüklenme Tarihi : </span></b> <span>{{user.UPLOAD_DATE}}</span></p>\n      <br>\n      <p><b><span>Beğeni Sayısı : </span></b> <span>{{user.LIKES}}</span></p>\n      <br>\n      <button ion-button full (click)="yorumlar(user.MUSIC_ID)">Yorumları gör ve Düzenle</button>\n    </ion-card-content>\n\n  </ion-card>\n</autoplay-content>\n</ion-content>'/*ion-inline-end:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\profil\profil.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_native_audio__["a" /* NativeAudio */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_admob_free__["a" /* AdMobFree */]])
    ], ProfilPage);
    return ProfilPage;
}());

//# sourceMappingURL=profil.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PresimonizlePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PresimonizlePage = /** @class */ (function () {
    function PresimonizlePage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.navimage = navParams.get('resim');
        console.log(this.navimage);
    }
    PresimonizlePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PresimonizlePage');
    };
    PresimonizlePage.prototype.kapat = function () {
        this.viewCtrl.dismiss();
    };
    PresimonizlePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-presimonizle',template:/*ion-inline-start:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\presimonizle\presimonizle.html"*/'<ion-content>\n  <img style="width: 100%; height: 100%;" src="{{navimage}}" (click)="kapat()">\n</ion-content>\n'/*ion-inline-end:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\presimonizle\presimonizle.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */]])
    ], PresimonizlePage);
    return PresimonizlePage;
}());

//# sourceMappingURL=presimonizle.js.map

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoYuklePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_media_capture__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_media__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_transfer__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__video_yukleicerik_video_yukleicerik__ = __webpack_require__(191);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









var MEDIA_FILES_KEY = 'mediaFiles';
var VideoYuklePage = /** @class */ (function () {
    function VideoYuklePage(navCtrl, navParams, mediaCapture, storage, file, media, transfer, loadingCtrl, toastCtrl, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.mediaCapture = mediaCapture;
        this.storage = storage;
        this.file = file;
        this.media = media;
        this.transfer = transfer;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.http = http;
        this.bilgi = { "muzik_adi": this.muzik_adi, "yazar_adi": this.yazar_adi };
        this.dizinBilgileri = { "dizin": this.dizin };
        this.kategoriYukle();
        this.image = window.localStorage.getItem("image");
        this.Nname = window.localStorage.getItem('n_name');
    }
    VideoYuklePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get(MEDIA_FILES_KEY).then(function (res) {
            _this.mediaFiles = JSON.parse(res) || [];
        });
    };
    VideoYuklePage.prototype.videoYukle = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__video_yukleicerik_video_yukleicerik__["a" /* VideoYukleicerikPage */]);
    };
    VideoYuklePage.prototype.kategoriYukle = function () {
        var _this = this;
        var baseURL = 'https://ilkcandogan.com/muzik_kategorileri.php';
        this.http.get(baseURL)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res);
            _this.kategoriGetir = res.bilgi;
        });
    };
    VideoYuklePage.prototype.showConfirmAlert = function (ID) {
        window.localStorage.setItem("idx", ID);
        this.CategoryId = window.localStorage.getItem("idx");
    };
    VideoYuklePage.prototype.captureVideo = function (ID) {
        var _this = this;
        if (this.bilgi.muzik_adi != "" && this.bilgi.yazar_adi) {
            try {
                var options = {
                    quality: 0.3,
                    limit: 1,
                    duration: 90
                };
                this.mediaCapture.captureVideo(options).then(function (res) {
                    var capturedFile = res[0];
                    var fileName = capturedFile.name;
                    var dir = capturedFile['localURL'].split('/');
                    dir.pop();
                    var fromDirectory = dir.join('/');
                    var toDirectory = _this.file.dataDirectory;
                    _this.file.copyFile(fromDirectory, fileName, toDirectory, fileName).then(function (res) {
                        var fileTransfer = _this.transfer.create();
                        var options1 = {
                            fileKey: 'video',
                            chunkedMode: false,
                            httpMethod: 'post',
                            mimeType: "video/mp4",
                            fileName: 'name.mp4',
                            headers: { 'Authorization': localStorage.getItem('token') },
                        };
                        /* muzik_adi,yazar_adi,kategori_id*/
                        var encodeOptions = _this.bilgi.muzik_adi + "&" +
                            "yazar_adi=" + _this.bilgi.yazar_adi + "&" + "kategori_id=";
                        var lastEncodeUri = encodeURI(encodeOptions);
                        var loader = _this.loadingCtrl.create({
                            content: "Yükleniyor"
                        });
                        loader.present();
                        fileTransfer.upload(res.nativeURL, 'https://ilkcandogan.com/video_yukle.php?muzik_adi=' + lastEncodeUri + _this.CategoryId, options1)
                            .then(function (data) {
                            loader.dismiss();
                            window.localStorage.removeItem("idx");
                        }, function (err) {
                            // error
                            /*alert("error"+JSON.stringify(err)); */
                        });
                    }, function (err) {
                        console.log('err: ', err);
                    });
                }, function (err) { return console.error(err); });
            }
            catch (_a) {
                console.log(console.error());
            }
        }
        else {
            this.hata0();
        }
    };
    VideoYuklePage.prototype.play = function (myFile) {
        try {
            if (myFile.name.indexOf('.mp4') > -1) {
                var audioFile = this.media.create(myFile.localURL);
                audioFile.play();
            }
            else {
                var path = this.file.dataDirectory + myFile.name;
                var url = path.replace(/^file:\/\//, '');
                var video = this.myVideo.nativeElement;
                video.src = url;
                this.upload();
                video.play();
            }
        }
        catch (_a) {
            console.log(console.error());
        }
    };
    VideoYuklePage.prototype.storeMediaFiles = function (files) {
        var _this = this;
        try {
            this.storage.get(MEDIA_FILES_KEY).then(function (res) {
                if (res) {
                    var arr = JSON.parse(res);
                    arr = arr.concat(files);
                    _this.storage.set(MEDIA_FILES_KEY, JSON.stringify(arr));
                }
                else {
                    _this.storage.set(MEDIA_FILES_KEY, JSON.stringify(files));
                }
                _this.mediaFiles = _this.mediaFiles.concat(files);
            });
        }
        catch (_a) {
            console.log(console.error());
        }
    };
    VideoYuklePage.prototype.hata0 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: 'Müzik Adı veya Söz kısmını boş bırakmayınız.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    VideoYuklePage.prototype.upload = function () {
        var fileTransfer = this.transfer.create();
        var options1 = {
            fileKey: 'video',
            chunkedMode: false,
            httpMethod: 'post',
            mimeType: "video/mp4",
            fileName: 'name.mp4',
            headers: { 'Authorization': localStorage.getItem('token') },
        };
        fileTransfer.upload('mediaFiles [];', 'https://ilkcandogan.com/video_yukle.php', options1)
            .then(function (data) {
            // success
        }, function (err) {
            // error
        });
    };
    ;
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myvideo'),
        __metadata("design:type", Object)
    ], VideoYuklePage.prototype, "myVideo", void 0);
    VideoYuklePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-video-yukle',template:/*ion-inline-start:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\video-yukle\video-yukle.html"*/'<html>\n<head></head>\n\n<body style="background-color:aqua; background-repeat: repeat-y; background-image: url(assets/imgs/backgr.png); background-repeat: no-repeat;\nbackground-size: 100% 100%; " >\n  \n    <div class="backgroundimage">\n          <div class="newspaper playing">\n           \n            <div class="title">\n                  <img  src="assets/imgs/slogo.png" height="60px;" width="160px;" alt="IMG">\n              </div>\n              <div class="headline">\n                <h2>Bu Haftanın Birincisi {{Nname}} rakiplerine meydan okuyor.</h2>\n              </div>\n              <div class="coverimage">\n                <img src="{{image}}" alt="">\n                <p style="font-size:6px;">Resimdeki Sanatçı : {{Nname}}</p>\n              </div>\n              <div class="copy">\n                <p>Türküm, doğruyum, çalışkanım,\n                    İlkem: küçüklerimi korumak, büyüklerimi saymak, yurdumu, milletimi özümden çok sevmektir.\n                    Ülküm: yükselmek, ileri gitmektir.\n                    Ey Büyük Atatürk!\n                    Açtığın yolda, gösterdiğin hedefe durmadan yürüyeceğime ant içerim.\n                    Varlığım Türk varlığına armağan olsun.\n                    Ne mutlu Türküm diyene!</p>\n                <p>“Bu memleket, dünyanın beklemediği, asla ümid etmediği bir müstesna mevcudiyetin yüksek tecellisine, yüksek sahne oldu. Bu sahne 7 bin senelik, en aşağı, bir Türk beşiğidir. Beşik tabiatın rüzgarları ile sallandı; beşiğin içindeki çocuk tabiatın yağmurları ile yıkandı. O çocuk tabiatın şimşeklerinden, yıldırımlarından, kasırgalarından evvela korkar gibi oldu; sonra onlara alıştı; onları tabiatın babası tanıdı, onların oğlu oldu; Bir gün o tabiat çocuğu tabiat oldu; şimşek, yıldırım, güneş oldu; Türk oldu. Türk budur. Yıldırımdır, kasırgadır, dünyayı aydınlatan güneştir.”\n                    Gazi Mustafa Kemal Atatürk</p>\n            \n                <p>“Uygarlık yolunda başarı yenileşmeye bağlıdır. Sosyal hayatta, iktisadi hayatta, ilim ve fen sahasında başarılı olmak için yegane gelişme ve ilerleme yolu budur”</p>\n                <p class="pullquote">“Bir ulus, sımsıkı birbirine bağlı olmayı bildikçe yeryüzünde onu dağıtabilecek bir güç düşünülemez.”</p>\n                <p>"Çalışmak demek, boşuna yorulmak, terlemek değildir. Zamanın gereklerine göre bilim ve teknik ve her türlü uygar buluşlardan azami derecede istifade etmek zorunludur."</p>\n              </div>\n            </div>\n            </div>\n            <button (click)="videoYukle()">Meydan Oku</button>\n      \n</body>\n\n\n</html>'/*ion-inline-end:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\video-yukle\video-yukle.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_media_capture__["a" /* MediaCapture */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_media__["a" /* Media */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_7__angular_http__["b" /* Http */]])
    ], VideoYuklePage);
    return VideoYuklePage;
}());

//# sourceMappingURL=video-yukle.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LikelistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__popover_popover__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LikelistPage = /** @class */ (function () {
    function LikelistPage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.noRecord = false;
        this.lottieControl = false;
        this.begenenler = navParams.get('likepagemusicid');
        this.loading(this.begenenler);
        this.lottieConfig2 = {
            path: 'assets/imgs/notfound.json',
            renderer: 'canvas',
            autoplay: true,
            loop: true
        };
        this.lottieConfig = {
            path: 'assets/imgs/like.json',
            renderer: 'canvas',
            autoplay: true,
            loop: true
        };
    }
    LikelistPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LikelistPage');
    };
    LikelistPage.prototype.loading = function (begenenler) {
        var _this = this;
        this.SSID = 0;
        var baseURL = 'https://ilkcandogan.com/video_begenileri_getir.php';
        this.http.get(baseURL + "?muzik_id=" + begenenler + "&start=" + this.SSID)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res);
            _this.likeusers = res.likedList;
            console.log(_this.likeusers);
            _this.SSID = res.SON_ID;
            if (_this.SSID == null) {
                _this.lottieControl = true;
            }
        }, function (err) {
        });
    };
    LikelistPage.prototype.goProfile = function (myEvent, myEvent2, myEvent3) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__popover_popover__["a" /* PopoverPage */], {
            idP: myEvent,
            Nickname: myEvent2,
            image: myEvent3
        });
    };
    LikelistPage.prototype.doInfinite = function (InfiniteScroll) {
        var _this = this;
        return new Promise(function (resolve) {
            setTimeout(function () {
                var baseURL = 'https://ilkcandogan.com/video_begenileri_getir.php';
                _this.http.get(baseURL + "?muzik_id=" + _this.begenenler + "&start=" + _this.SSID)
                    .map(function (res) { return res.json(); })
                    .subscribe(function (res) {
                    console.log(res);
                    _this.resposeData = res;
                    _this.listData = _this.resposeData.likedList;
                    if (_this.resposeData.likedList !== null) {
                        if (_this.listData.length > 0) {
                            for (var index = 0; index < _this.listData.length; index++) {
                                _this.likeusers.push(_this.listData[index]);
                            }
                        }
                        else {
                            _this.noRecord = true;
                        }
                    }
                    _this.SSID = res.SON_ID;
                    InfiniteScroll.complete();
                }, function (err) {
                });
            }, 4000);
        });
    };
    LikelistPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-likelist',template:/*ion-inline-start:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\likelist\likelist.html"*/'<!--\n  Generated template for the LikelistPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header color="dark">\n  <ion-navbar color="dark">\n    <ion-title>Beğenenler</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div class="canvasi" *ngIf="!likeusers">\n    <lottie-animation-view *ngIf="!likeusers" [options]="lottieConfig" [width]="300" [height]="300">\n    </lottie-animation-view>\n  </div>\n  <div class="canvasi" *ngIf="lottieControl">\n    <lottie-animation-view *ngIf="lottieControl" [options]="lottieConfig2" [width]="300" [height]="300">\n    </lottie-animation-view>\n  </div>\n  <p *ngIf="lottieControl" style="font-size: 24px; color:#ce0e0e; width:100%; text-align:center;">Henüz beğenen\n    kullanıcı yok. !</p>\n  <ion-list *ngFor="let luser of likeusers" (click)="goProfile(luser.USER_ID,luser.N_NAME,luser.IMAGE)"\n    style="border-bottom: 1px solid rgb(175, 175, 175) !important;">\n    <ion-item style=" margin-top: 0px;">\n      <ion-thumbnail item-start>\n        <img src="{{luser.IMAGE}}">\n      </ion-thumbnail>\n      <h2>{{luser.N_NAME}}</h2>\n      <ion-note>\n        {{luser.F_NAME}} {{luser.L_NAME}}\n      </ion-note>\n    </ion-item>\n\n  </ion-list>\n  <strong>\n    <p *ngIf="noRecord" style="color:rgb(160, 154, 154); margin-top: 0px;  text-align:center;">Daha fazla beğenen\n      kullanıcı yok. !</p>\n  </strong>\n  <ion-infinite-scroll style="height:1vh;" (ionInfinite)="doInfinite($event)" *ngIf="!noRecord">\n    <ion-infinite-scroll-content loadingSpinner="crescent" loadingText="Yükleniyor...">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>'/*ion-inline-end:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\likelist\likelist.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
    ], LikelistPage);
    return LikelistPage;
}());

//# sourceMappingURL=likelist.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HaftaninBirincileriPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__popover_popover__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HaftaninBirincileriPage = /** @class */ (function () {
    function HaftaninBirincileriPage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.haftaninVideolari();
    }
    HaftaninBirincileriPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HaftaninBirincileriPage');
    };
    HaftaninBirincileriPage.prototype.presentPopover = function (myEvent, myEvent2, myEvent3) {
        this.PId = myEvent;
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__popover_popover__["a" /* PopoverPage */], {
            idP: myEvent,
            Nickname: myEvent2,
            image: myEvent3
        });
    };
    HaftaninBirincileriPage.prototype.haftaninVideolari = function () {
        var _this = this;
        var baseURL = 'https://ilkcandogan.com/birinciler.php';
        this.http.get(baseURL)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res);
            _this.users = res.bilgi;
            _this.uzunluk = _this.users;
            console.log("uzunluk" + _this.uzunluk.length);
            if (_this.uzunluk.length < 1) {
                _this.veri = true;
            }
        }, function (err) {
        });
    };
    HaftaninBirincileriPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-haftanin-birincileri',template:/*ion-inline-start:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\haftanin-birincileri\haftanin-birincileri.html"*/'<!--\n  Generated template for the HaftaninBirincileriPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="dark">\n    <button ion-button menuToggle style="margin-top:6%;">\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title style="margin-top:6%;">Haftanın Birincileri</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div class="pyro" *ngIf="!veri">\n    <div class="before"></div>\n    <div class="after"></div>\n  </div>\n  <autoplay-content>\n  <ion-card *ngFor="let user of users">\n\n    <ion-item>\n     \n      <ion-avatar item-start>\n        <img src="{{user.IMAGE}}" (click)="presentPopover(user.USER_ID,user.N_NAME,user.IMAGE)">\n      </ion-avatar>\n      <h2><strong>{{user.N_NAME}}</strong></h2>\n\n    </ion-item>\n    <div>\n        <video  poster="{{user.THUMB}}">\n            <source src="{{user.VIDEO}}" type="video/mp4" style="height:100%;">\n            Videonuz Yüklenemiyor\n          </video>\n        </div>\n    <br>\n    \n    <ion-card-content>\n      <ion-chip color="label-color">\n        <ion-icon name="md-time"></ion-icon>\n        <ion-label color="dark">\n          <p style="color:rgb(0, 35, 102); margin: 1px;"><strong>Yüklenme Tarihi :</strong>{{user.UPLOAD_DATE}}</p>\n        </ion-label>\n      </ion-chip>\n    </ion-card-content>\n    <ion-card-content>\n      <ion-chip color="label-color">\n        <ion-icon name="md-time"></ion-icon>\n        <ion-label color="dark">\n          <p style="color:rgb(0, 35, 102); margin: 1px;"><strong>Beğeni Sayısı : </strong>{{user.LIKES}}</p>\n        </ion-label>\n      </ion-chip>\n    </ion-card-content>\n    <ion-card-content>\n      <ion-chip color="label-color">\n        <ion-icon name="md-musical-notes"></ion-icon>\n        <ion-label color="dark">\n          <p style="color:rgb(0, 35, 102); margin: 1px;"><strong>Şarkı Adı : </strong>{{user.MUSIC_NAME}}</p>\n        </ion-label>\n      </ion-chip>\n    </ion-card-content>\n    <ion-card-content>\n      <ion-chip color="label-color">\n        <ion-icon name="md-microphone"></ion-icon>\n        <ion-label color="dark">\n          <p style="color:rgb(0, 35, 102); margin: 1px;"><strong>Tür : </strong>{{user.CATEGORY_NAME}}</p>\n        </ion-label>\n      </ion-chip>\n    </ion-card-content>\n  </ion-card>\n  <h1 *ngIf="veri">Bu Haftanın Birincisi Henüz Belirlenmedi</h1>\n</autoplay-content>\n<br>\n<br>\n<br>\n </ion-content>\n <div class="light"></div>\n <div class="light"></div>\n'/*ion-inline-end:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\haftanin-birincileri\haftanin-birincileri.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
    ], HaftaninBirincileriPage);
    return HaftaninBirincileriPage;
}());

//# sourceMappingURL=haftanin-birincileri.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HaberlerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__habericerik_habericerik__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_page_transitions__ = __webpack_require__(370);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HaberlerPage = /** @class */ (function () {
    function HaberlerPage(navCtrl, navParams, http, nativePageTransitions) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.nativePageTransitions = nativePageTransitions;
        this.lottieConfig = {
            path: 'assets/imgs/homeload.json',
            renderer: 'canvas',
            autoplay: true,
            loop: true
        };
        this.noRecord = false;
        this.baslangic();
    }
    HaberlerPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HaberlerPage');
    };
    HaberlerPage.prototype.icerikGit = function (ID) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__habericerik_habericerik__["a" /* HabericerikPage */], {}, { animate: true, animation: "" });
        window.localStorage.setItem("haberId", ID);
        console.log(ID);
    };
    HaberlerPage.prototype.doInfinite = function (InfiniteScroll) {
        var _this = this;
        return new Promise(function (resolve) {
            setTimeout(function () {
                var baseURL = 'https://ilkcandogan.com/haberler.php';
                _this.http.get(baseURL + "?start=" + _this.hId)
                    .map(function (res) { return res.json(); })
                    .subscribe(function (res) {
                    console.log(res);
                    _this.resposeData = res;
                    _this.veri = _this.resposeData.bilgi;
                    if (_this.resposeData.bilgi.ID !== null) {
                        if (_this.veri.length > 0) {
                            for (var index = 0; index < _this.veri.length; index++) {
                                _this.Haberler.push(_this.veri[index]);
                            }
                        }
                        else {
                            _this.noRecord = true;
                        }
                    }
                    _this.hId = res.SON_ID;
                    InfiniteScroll.complete();
                }, function (err) {
                });
            }, 4000);
        });
    };
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
    HaberlerPage.prototype.baslangic = function () {
        var _this = this;
        this.hId = 0;
        var baseURL = 'https://ilkcandogan.com/haberler.php';
        this.http.get(baseURL + "?start=" + this.hId)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res);
            _this.Haberler = res.bilgi;
            _this.hId = res.SON_ID;
        }, function (err) {
        });
    };
    HaberlerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-haberler',template:/*ion-inline-start:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\haberler\haberler.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n      <button ion-button menuToggle style="margin-top:6%;">\n          <ion-icon name="menu"></ion-icon>\n        </button>\n    <ion-title center style="margin-top:6%;">Singraf Magazin</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n    <div class="canvasi" *ngIf="!Haberler">\n        <lottie-animation-view *ngIf="!Haberler"\n        [options]="lottieConfig"\n        [width]="300"\n        [height]="300"\n        >\n      </lottie-animation-view>\n      </div>\n      <div class="canvasi" *ngIf="!Haberler">\n          <lottie-animation-view *ngIf="!Haberler"\n          [options]="lottieConfig"\n          [width]="300"\n          [height]="300"\n          >\n        </lottie-animation-view>\n        </div>\n        <div style="margin-top:12%; height:110px; width:100%;"></div>\n        <div class="wrapper" *ngFor="let user of Haberler">\n            <img src="{{user.RESIM}}" onerror="this.src=\'../assets/imgs/nophoto.png\';"/>\n          <div class="imageInfo">\n            <h3 id="imgTitle" (click)="icerikGit(user.ID)">{{user.BASLIK}}</h3>\n          </div>\n        </div>\n        <br>\n        <strong>\n            <p *ngIf="noRecord" style="color:rgb(160, 154, 154);  text-align:center;">Daha Fazla Haber Bulunamamaktadır.</p>\n          </strong>\n  <!--\n  <ion-card *ngFor="let user of Haberler">\n    <ion-card-title justify>\n      {{user.BASLIK}}\n    </ion-card-title>\n    <img src="{{user.RESIM}}" onerror="this.src=\'../assets/imgs/nophoto.png\';" />\n    <ion-card-content>\n      <button ion-button color="primary" clear small icon-start>\n        <ion-icon name=\'md-list-box\'></ion-icon>\n        <b>\n          <p style="color:#ce0e0e" (click)="icerikGit(user.ID)">Haberin İçeriğini Gör</p>\n        </b>\n      </button>\n    </ion-card-content>\n  </ion-card>\n  <br>\n  <br>\n  <br>>\n  <strong>\n    <p *ngIf="noRecord" style="color:rgb(160, 154, 154);  text-align:center;">Daha Fazla Haber Bulunamamaktadır.</p>\n  </strong>\n  <br>\n-->\n\n  <ion-infinite-scroll style="height:2vh;" (ionInfinite)="doInfinite($event)" *ngIf="!noRecord">\n    <ion-infinite-scroll-content loadingSpinner="crescent" loadingText="Yükleniyor...">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\haberler\haberler.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_page_transitions__["a" /* NativePageTransitions */]])
    ], HaberlerPage);
    return HaberlerPage;
}());

//# sourceMappingURL=haberler.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KategorilerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__kategoriiceril_kategoriiceril__ = __webpack_require__(194);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the KategorilerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var KategorilerPage = /** @class */ (function () {
    function KategorilerPage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.lottieConfig = {
            path: 'assets/imgs/kategorilerskeleton.json',
            renderer: 'canvas',
            autoplay: true,
            loop: true
        };
        this.veriCek();
    }
    KategorilerPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad KategorilerPage');
    };
    KategorilerPage.prototype.getIstek = function (ID) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__kategoriiceril_kategoriiceril__["a" /* KategoriicerilPage */]);
        window.localStorage.setItem("kategoriid", ID);
        console.log(ID);
    };
    KategorilerPage.prototype.veriCek = function () {
        var _this = this;
        var baseURL = 'https://ilkcandogan.com/muzik_kategorileri.php';
        this.http.get(baseURL)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res);
            _this.kategoriler = res.bilgi;
        }, function (err) {
        });
    };
    KategorilerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-kategoriler',template:/*ion-inline-start:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\kategoriler\kategoriler.html"*/'\n<ion-header>\n\n  <ion-navbar color="dark">\n      <button ion-button menuToggle style="margin-top:6%;">\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      <ion-title center style="margin-top:6%;">Kategoriler</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <div style="margin-left: -10px; margin-top: 2%;" *ngIf="!kategoriler">\n        <lottie-animation-view *ngIf="!kategoriler"\n        [options]="lottieConfig"\n        [width]="375"\n        [height]="600"\n        >\n      </lottie-animation-view>\n      </div>\n      <div style="margin-left: -10px; margin-top: 2%;" *ngIf="!kategoriler">\n          <lottie-animation-view *ngIf="!kategoriler"\n          [options]="lottieConfig"\n          [width]="375"\n          [height]="600"\n          >\n        </lottie-animation-view>\n        </div>\n  <ion-list *ngFor="let category of kategoriler">\n      <ion-item>\n        <ion-thumbnail item-start>\n          <img src="assets/imgs/categorymusic.png">       \n        </ion-thumbnail>\n        <h2>{{category.CATEGORY}}</h2>        \n        <ion-badge item-end>{{category.COUNT}}</ion-badge>\n        <button ion-button clear item-end (click)="getIstek(category.ID)">Gözat</button>\n      </ion-item>\n    </ion-list>\n                </ion-content>\n'/*ion-inline-end:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\kategoriler\kategoriler.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
    ], KategorilerPage);
    return KategorilerPage;
}());

//# sourceMappingURL=kategoriler.js.map

/***/ }),

/***/ 184:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatRoomPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_veritabani_veritabani__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_admob_free__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_chat_chat__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng_socket_io__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng_socket_io__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the ChatRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChatRoomPage = /** @class */ (function () {
    function ChatRoomPage(navCtrl, navParams, veritabani, admobFree, soket) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.veritabani = veritabani;
        this.admobFree = admobFree;
        this.soket = soket;
        this.kayitliMesajlar = [];
        this.a = 0;
        this.veritabani.kisiOku().then(function (data) {
            _this.kayitliMesajlar = data;
        });
        this.mesajGetir().subscribe(function (mesaj) {
            _this.k();
        });
    }
    ChatRoomPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChatRoomPage');
    };
    ChatRoomPage.prototype.mesajIcerik = function (user_id, nname) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_chat_chat__["a" /* ChatPage */], {
            u_id: user_id,
            nickname: nname
        });
    };
    ChatRoomPage.prototype.mesajGetir = function () {
        var _this = this;
        var observable = new __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"](function (observer) {
            _this.soket.on('mesaj', function (data) {
                observer.next(data);
            });
        });
        return observable;
    };
    ChatRoomPage.prototype.k = function () {
        var _this = this;
        this.veritabani.kisiOku().then(function (data) {
            _this.kayitliMesajlar = data;
            if (_this.a === 0) {
                _this.k();
                _this.a++;
            }
        });
    };
    ChatRoomPage.prototype.sil = function (a, b) {
        var _this = this;
        this.veritabani.kisiVeMesajSil(a, b).then(function (data) {
            alert("data:" + JSON.stringify(data));
            _this.veritabani.kisiOku().then(function (data) {
                _this.kayitliMesajlar = data;
            });
        });
    };
    ChatRoomPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-chat-room',template:/*ion-inline-start:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\chat-room\chat-room.html"*/'<ion-header color="dark">\n  <ion-navbar color="dark">\n    <ion-title>\n      Mesajlar \n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content >\n\n  <ion-item  (click)="mesajIcerik(data.NICKNAME_ID,data.NICKNAME)" *ngFor="let data of kayitliMesajlar">\n    <ion-avatar item-start>\n      <img src="{{data.IMG}}">\n    </ion-avatar>\n    <strong>{{data.NICKNAME}}</strong>\n    <h6></h6>\n  </ion-item>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\chat-room\chat-room.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_veritabani_veritabani__["a" /* VeritabaniProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_admob_free__["a" /* AdMobFree */], __WEBPACK_IMPORTED_MODULE_6_ng_socket_io__["Socket"]])
    ], ChatRoomPage);
    return ChatRoomPage;
}());

//# sourceMappingURL=chat-room.js.map

/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CikisPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_veritabani_veritabani__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_admob_free__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CikisPage = /** @class */ (function () {
    function CikisPage(navCtrl, navParams, http, loadingCtrl, veritabani, admobFree) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.veritabani = veritabani;
        this.admobFree = admobFree;
        window.localStorage.removeItem('PlayIdCheck');
        var bannerConfig = {
            id: "ca-app-pub-2851043339565426/7453408132",
            isTesting: false,
            autoShow: true
        };
        this.admobFree.banner.config(bannerConfig);
        this.admobFree.banner.hide()
            .then(function () {
            // banner Ad is ready
            // if we set autoShow to false, then we will need to call the show method here
        })
            .catch(function (e) { return console.log(e); });
    }
    CikisPage.prototype.ionViewDidLoad = function (credentials) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Çıkış Yapılıyor"
        });
        loader.present();
        var baseURL = 'https://ilkcandogan.com/';
        var baseParams = 'cikis.php';
        var testURL = (baseURL + baseParams);
        var authHeader = JSON.stringify(window.localStorage.getItem('token'));
        var headersObj = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headersObj.append('Authorization', authHeader);
        this.http.post(testURL, JSON.stringify(credentials), { headers: headersObj })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            /*   this.webReturn = res; */
            window.localStorage.removeItem('token');
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
            loader.dismiss();
            _this.veritabani.mesajSil();
        });
    };
    CikisPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-cikis',template:/*ion-inline-start:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\cikis\cikis.html"*/'\n'/*ion-inline-end:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\cikis\cikis.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__providers_veritabani_veritabani__["a" /* VeritabaniProvider */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_admob_free__["a" /* AdMobFree */]])
    ], CikisPage);
    return CikisPage;
}());

//# sourceMappingURL=cikis.js.map

/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KayitOlPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






/**
 * Generated class for the KayitOlPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var KayitOlPage = /** @class */ (function () {
    function KayitOlPage(menu, navCtrl, navParams, toastCtrl, alertController, options, http, loadingCtrl, authService, toastController) {
        this.menu = menu;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.alertController = alertController;
        this.options = options;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.authService = authService;
        this.toastController = toastController;
        this.userData = { "n_name": this.n_name, "f_name": this.f_name, "l_name": this.l_name, "mail": this.mail, "pass": this.pass };
        this.menuhidden();
    }
    KayitOlPage.prototype.gpage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
    };
    KayitOlPage.prototype.menuhidden = function () {
        this.menu.enable(false);
    };
    KayitOlPage.prototype.register = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Kayıt işleminiz yapılıyor."
        });
        loader.present();
        if (this.userData.n_name && this.userData.f_name && this.userData.l_name && this.userData.mail &&
            this.userData.pass.length >= 1 && this.userData.pass == this.repass) {
            this.authService.postData(this.userData, "kayit_ol.php").then(function (result) {
                _this.resposeData = JSON.stringify(result);
                _this.tumBilgiler = JSON.parse(_this.resposeData);
                if (_this.tumBilgiler["hata"] == "0") {
                    _this.hata0();
                    if (_this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */])) {
                        loader.dismiss();
                    }
                }
                else if (_this.tumBilgiler["hata"] == "1") {
                    _this.hata1();
                    loader.dismiss();
                }
                else if (_this.tumBilgiler["hata"] == "2") {
                    _this.hata2();
                    loader.dismiss();
                }
                else if (_this.tumBilgiler["hata"] == "5") {
                    _this.hata5();
                    loader.dismiss();
                }
            }, function (err) {
                loader.dismiss();
                _this.showalertinfo();
                //Connection failed message
            });
        }
        else {
            //this.presentToast("Give username and password");
            loader.dismiss();
            this.showalertinfo();
        }
    };
    KayitOlPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    };
    KayitOlPage.prototype.hata2 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Mail adresiniz kullanılıyor.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    KayitOlPage.prototype.hata5 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Desteklenmeyen mail adresi girdiniz.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    KayitOlPage.prototype.hata0 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Aktivasyon linkiniz e-posta adresinize gönderilmiştir.',
                            duration: 4000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    KayitOlPage.prototype.hata1 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Kullanıcı adınız kullanılıyor.Lütfen başka bir kullanıcı adı seçiniz.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    KayitOlPage.prototype.showalertinfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Kullanıcı bilgileriniz yanlış.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    KayitOlPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad KayitolpPage');
    };
    KayitOlPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-kayit-ol',template:/*ion-inline-start:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\kayit-ol\kayit-ol.html"*/'<ion-header no-border>\n\n  <ion-navbar hideBackButton *navbar hideMenuToggle>\n    <ion-title>kayitolp</ion-title>\n  </ion-navbar>\n\n</ion-header>\n  <div class="begin_login">\n        <div class="limiter">\n          <div class="container-login100">\n         <div class="wrap-login100">\n      <div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">\n        <input class="input100" type="text" name="email" placeholder="Kullanıcı Adı  " [(ngModel)]="userData.n_name">\n        <span class="focus-input100"></span>\n        <span class="symbol-input100">\n          <ion-icon name="md-person"></ion-icon>\n        </span>\n      </div>\n      <div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">\n        <input class="input100" type="text" name="email" placeholder="Adınız " [(ngModel)]="userData.f_name">\n        <span class="focus-input100"></span>\n        <span class="symbol-input100">\n          <ion-icon name="ios-person-outline"></ion-icon>\n        </span>\n      </div>\n      <div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">\n        <input class="input100" type="text" placeholder="Soyadınız " type="text" [(ngModel)]="userData.l_name">\n        <span class="focus-input100"></span>\n        <span class="symbol-input100">\n          <ion-icon name="ios-person"></ion-icon>\n        </span>\n      </div>\n      <div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">\n        <input class="input100" type="text" placeholder="E-Posta Adresiniz " [(ngModel)]="userData.mail">\n        <span class="focus-input100"></span>\n        <span class="symbol-input100">\n          <ion-icon name="ios-mail"></ion-icon>\n        </span>\n      </div>\n      <div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">\n        <input class="input100" type="text" name="email" placeholder="Şifreniz " type="password" [(ngModel)]="userData.pass">\n        <span class="focus-input100"></span>\n        <span class="symbol-input100">\n          <ion-icon name="md-lock"></ion-icon>\n        </span>\n      </div>\n      <div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">\n        <input class="input100" type="text" name="email" placeholder="Şifre Tekrar " type="password" [(ngModel)]="repass">\n        <span class="focus-input100"></span>\n        <span class="symbol-input100">\n          <ion-icon name="md-unlock"></ion-icon>\n        </span>\n      </div>\n\n\n      <div class="container-login100-form-btn">\n        <button class="login100-form-btn" (click)="register()">\n          <ion-icon name="md-log-in"></ion-icon>&nbsp;\n          Kayıt Ol\n        </button>\n      </div>\n\n      <div class="container-login100-form-btn">\n        <button class="login100-form-btn" (click)="gpage()">\n          <ion-icon name="ios-arrow-back"></ion-icon>&nbsp;\n          Giriş Sayfasına Dön\n        </button>\n      </div>\n</div>\n</div>\n</div>\n      <!--\n  <ion-list class="registerpage">\n    <ion-item>\n      <ion-input placeholder="Kullanıcı Adı : " type="username" [(ngModel)]="userData.n_name">\n      </ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-input placeholder="Adınız :" type="text" [(ngModel)]="userData.f_name">\n      </ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-input placeholder="Soyadınız :" type="text" [(ngModel)]="userData.l_name">\n      </ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-input placeholder="E-Posta Adresiniz :" type="text" [(ngModel)]="userData.mail">\n      </ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-input placeholder="Şifreniz :" type="password" [(ngModel)]="userData.pass">\n      </ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-input placeholder="Şifre Tekrar :" type="password" [(ngModel)]="repass">\n      </ion-input>\n    </ion-item>\n  </ion-list>\n  <button ion-button full (click)="register()">Kayıt Ol</button>\n  <button ion-button full (click)="gpage()">Giriş Ekranına Dön</button>\n-->\n\n'/*ion-inline-end:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\kayit-ol\kayit-ol.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["d" /* RequestOptions */], __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */]])
    ], KayitOlPage);
    return KayitOlPage;
}());

//# sourceMappingURL=kayit-ol.js.map

/***/ }),

/***/ 187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BioDuzenlePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var BioDuzenlePage = /** @class */ (function () {
    function BioDuzenlePage(navCtrl, navParams, http, toastController, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.toastController = toastController;
        this.loadingCtrl = loadingCtrl;
        this.userData = { "f_name": this.f_name, "l_name": this.l_name, "city": this.city, "bio": this.bio, "b_date": this.b_date };
        this.bodyTwo = { "n_name": this.n_name };
        this.sociaButton = { "ins": this.ins, "face": this.face, "twit": this.twit };
        this.bodyThree = { "new_pass": this.new_pass };
        this.bDegis = { "bio": "X" };
        this.fString = "Facebook kullanıcı adınız";
        this.iString = "İnstagram kullanıcı adınız";
        this.TString = "Twitter kullanıcı adınız";
        this.datains = window.localStorage.getItem('instagram');
        this.datatwitter = window.localStorage.getItem('twitter');
        this.dataface = window.localStorage.getItem("facebook");
        if (this.sociaButton.ins == null) {
            this.datains = this.iString;
        }
        if (this.sociaButton.face == null) {
            this.dataface = this.fString;
        }
        if (this.sociaButton.twit == null) {
            this.datatwitter = this.TString;
        }
        this.userN_name = window.localStorage.getItem('n_name');
        this.userF_name = window.localStorage.getItem('f_name');
        this.userLname = window.localStorage.getItem('l_name');
        this.userImage = window.localStorage.getItem('image');
        this.yukle();
        console.log(window.localStorage.getItem('image'));
    }
    BioDuzenlePage.prototype.ionViewWillLeave = function () {
        window.localStorage.removeItem("facebook");
        window.localStorage.removeItem("twitter");
        window.localStorage.removeItem("instagram");
    };
    BioDuzenlePage.prototype.ionViewDidLoad = function () {
    };
    BioDuzenlePage.prototype.faceKaldir = function () {
        var _this = this;
        var baseURL = 'https://ilkcandogan.com/';
        var baseParams = 'profil_duzenle.php';
        var testURL = (baseURL + baseParams);
        var authHeader = window.localStorage.getItem('token');
        var headersObj = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headersObj.append('Authorization', authHeader);
        var body = {
            "face": "X",
        };
        this.http.post(testURL, body, { headers: headersObj })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.resposeData = res;
            console.log(_this.resposeData);
        });
    };
    BioDuzenlePage.prototype.twitterKaldir = function () {
        var _this = this;
        var baseURL = 'https://ilkcandogan.com/';
        var baseParams = 'profil_duzenle.php';
        var testURL = (baseURL + baseParams);
        var authHeader = window.localStorage.getItem('token');
        var headersObj = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headersObj.append('Authorization', authHeader);
        var body = {
            "twit": "X",
        };
        this.http.post(testURL, body, { headers: headersObj })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.resposeData = res;
            console.log(_this.resposeData);
        });
    };
    BioDuzenlePage.prototype.instagramKaldir = function () {
        var _this = this;
        var baseURL = 'https://ilkcandogan.com/';
        var baseParams = 'profil_duzenle.php';
        var testURL = (baseURL + baseParams);
        var authHeader = window.localStorage.getItem('token');
        var headersObj = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headersObj.append('Authorization', authHeader);
        var body = {
            "ins": "X",
        };
        this.http.post(testURL, body, { headers: headersObj })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.resposeData = res;
            console.log(_this.resposeData);
        });
    };
    BioDuzenlePage.prototype.socialMedia = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Bağlantılarınız ekleniyor."
        });
        loader.present();
        var baseURL = 'https://ilkcandogan.com/';
        var baseParams = 'profil_duzenle.php';
        var testURL = (baseURL + baseParams);
        var authHeader = window.localStorage.getItem('token');
        var headersObj = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headersObj.append('Authorization', authHeader);
        var body = {
            "ins": this.sociaButton.ins,
            "face": this.sociaButton.face,
            "twit": this.sociaButton.twit
        };
        this.http.post(testURL, body, { headers: headersObj })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            loader.dismiss();
            _this.resposeData = res;
            if (_this.resposeData["hata"] == "0") {
                _this.kontrol();
            }
            if (_this.sociaButton.face == null) {
                _this.faceKaldir();
            }
            if (_this.sociaButton.ins == null) {
                _this.instagramKaldir();
            }
            if (_this.sociaButton.twit == null) {
                _this.twitterKaldir();
            }
        });
    };
    //#region Şifremi Değiştir
    BioDuzenlePage.prototype.yukle = function () {
        var _this = this;
        var Id = window.localStorage.getItem('idf');
        var baseURL = 'https://ilkcandogan.com/video_profil.php?id=';
        this.http.get(baseURL + Id)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res);
            _this.uBilgiler = res.profil;
            _this.bottomData = res.video;
            if (_this.dataface == "null") {
                _this.dataface = _this.fString;
            }
            if (_this.datains == "null") {
                _this.datains = _this.iString;
            }
            if (_this.datatwitter == "null") {
                _this.datatwitter = _this.TString;
            }
            console.log(_this.uBilgiler);
        }, function (err) {
        });
    };
    BioDuzenlePage.prototype.sifreDegis = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Şifreniz Değiştiriliyor"
        });
        loader.present();
        if (this.bodyThree.new_pass == this.rp) {
            var baseURL = 'https://ilkcandogan.com/';
            var baseParams = 'profil_duzenle.php';
            var testURL = (baseURL + baseParams);
            var authHeader = window.localStorage.getItem('token');
            var headersObj = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
            headersObj.append('Authorization', authHeader);
            this.http.post(testURL, this.bodyThree, { headers: headersObj })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                _this.resposeData = res;
                loader.dismiss();
                if (_this.resposeData["TOKEN"]) {
                    _this.dhata0();
                    window.localStorage.setItem("token", _this.resposeData["TOKEN"]);
                    console.log(window.localStorage.getItem("token"));
                }
                console.log(res);
            });
        }
        else {
            console.log("Bir değil");
        }
    };
    //#endregion
    BioDuzenlePage.prototype.degistir = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Kullanıcı Bilgileriniz Güncelleniyor"
        });
        loader.present();
        if (this.userData.bio == "") {
            var baseURL = 'https://ilkcandogan.com/';
            var baseParams = 'profil_duzenle.php';
            var testURL = (baseURL + baseParams);
            var authHeader = window.localStorage.getItem('token');
            var headersObj = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
            headersObj.append('Authorization', authHeader);
            this.http.post(testURL, this.bDegis.bio, { headers: headersObj })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                _this.resposeData = res;
                loader.dismiss();
                console.log(res);
            });
        }
        else {
            var baseURL = 'https://ilkcandogan.com/';
            var baseParams = 'profil_duzenle.php';
            var testURL = (baseURL + baseParams);
            var authHeader = window.localStorage.getItem('token');
            var headersObj = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
            headersObj.append('Authorization', authHeader);
            var newStr = this.userData;
            var renewStr = newStr.toString().replace(this.userData.f_name, "_");
            this.http.post(testURL, this.userData, { headers: headersObj })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                _this.resposeData = res;
                loader.dismiss();
                if (_this.resposeData["hata"] == "0") {
                    _this.hata0();
                }
                else {
                    _this.hata8();
                }
                console.log(res);
            });
        }
    };
    BioDuzenlePage.prototype.kullaniciDegistir = function () {
        var _this = this;
        if (this.n_name == "" && this.n_name == null) {
            this.hata12();
        }
        else {
            var loader_1 = this.loadingCtrl.create({
                content: "Kullanıcı Bilgileriniz Güncelleniyor"
            });
            loader_1.present();
            var baseURL = 'https://ilkcandogan.com/';
            var baseParams = 'profil_duzenle.php';
            var testURL = (baseURL + baseParams);
            var authHeader = window.localStorage.getItem('token');
            var headersObj = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
            headersObj.append('Authorization', authHeader);
            this.http.post(testURL, this.bodyTwo, { headers: headersObj })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                _this.resposeData = res;
                loader_1.dismiss();
                if (_this.resposeData["hata"] == "0") {
                    _this.hata2();
                }
                else if (_this.resposeData["hata"] == "5") {
                    _this.hata5();
                }
                if (_this.resposeData["hata"] == "6") {
                    _this.hata6();
                }
                else {
                    console.log("İnternet Bağlantınızı Kontrol Ediniz.");
                }
                console.log(res);
            });
        }
    };
    BioDuzenlePage.prototype.kontrol = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Sosyal medya bağlantılarınız güncellendi.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    BioDuzenlePage.prototype.hata0 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Profil Bilgileriniz Başarıyla Güncellendi...',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    BioDuzenlePage.prototype.kaldir0 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Sosyal medya hesabınız kaldırıldı.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    BioDuzenlePage.prototype.ekle0 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Sosyal medya hesabınız eklendi.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    BioDuzenlePage.prototype.dhata0 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Şifreniz Başarıyla Değiştirildi...',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    BioDuzenlePage.prototype.hata12 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Lütfen Kullanıcı adını boş bırakmayınız...',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    BioDuzenlePage.prototype.hata5 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Başka bir hesap tarafından kullanılıyor...',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    BioDuzenlePage.prototype.hata2 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Kullanıcı Adınız Güncellendi...',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    BioDuzenlePage.prototype.hata8 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Belirlenemeyen Bir hata oluştu...',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    BioDuzenlePage.prototype.hata6 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Yetersiz Coin',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    BioDuzenlePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-bio-duzenle',template:/*ion-inline-start:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\bio-duzenle\bio-duzenle.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n    <ion-title center style="margin-top:6%;">Kullanıcı Ayarları</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-spinner item-start name="crescent" *ngIf="!uBilgiler" color="dark"></ion-spinner>\n<ion-content>\n<ion-list *ngFor="let bilgi of uBilgiler">\n  <ion-list-header>     \n    <ion-avatar item-start>\n      <img src="{{bilgi.IMAGE}}">\n    </ion-avatar>\n    <b><p class="username">{{bilgi.N_NAME}}</p></b>\n    <p>{{bilgi.F_NAME}} {{bilgi.L_NAME}}</p>\n  </ion-list-header>\n</ion-list>\n<ion-list no-border>\n  <ion-list-header>\n    Kullanıcı Bilgileriniz\n  </ion-list-header>\n  <ion-item>\n    <ion-icon color="dark" name=\'md-person\' item-start></ion-icon>\n    <ion-input placeholder="Ad " type="text" [(ngModel)]="userData.f_name">\n    </ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-icon color="dark" name=\'ios-person-outline\' item-start></ion-icon>\n    <ion-input placeholder="Soyad " type="text" [(ngModel)]="userData.l_name">\n    </ion-input>  \n  </ion-item>\n  <ion-item>\n    <ion-icon color="dark" name=\'md-compass\' item-start></ion-icon>\n    <ion-input placeholder="Şehir " type="text" [(ngModel)]="userData.city">\n    </ion-input> \n  </ion-item>\n  <ion-item>\n    <ion-icon color="dark" name=\'md-bicycle\' item-start></ion-icon>\n    <ion-input placeholder="Biyografi " type="text" [(ngModel)]="userData.bio">\n    </ion-input>   \n  </ion-item>\n  <ion-item>\n    <ion-icon color="dark" name=\'md-calendar\' item-start></ion-icon>\n    <ion-label>Doğum Tarihi</ion-label>\n    <ion-datetime displayFormat="YYYY-DD-MM" \n    pickerFormat="YYYY-MM-DD" [(ngModel)]="userData.b_date"\n    min="1950-01-01" max="2014-12-31"\n    [doneText]="(\'tamam\')"\n    [cancelText]="(\'iptal\')"\n    ></ion-datetime>\n  </ion-item>\n  <ion-item>\n    <button color="label-color" ion-button (click)="degistir()" item-end>\n      <p style="font-family: Arial, Helvetica, sans-serif; color:#ce0e0e;">DEĞİŞTİR</p>\n    </button>\n  </ion-item>\n</ion-list>\n\n<ion-list>\n    <ion-list-header>\n      Sosyal medya hesabı ekle\n    </ion-list-header>\n    <ion-item>\n        <ion-icon color="instagram" name=\'logo-instagram\' item-start></ion-icon>\n      <ion-input placeholder="{{datains}}" type="text" [(ngModel)]="sociaButton.ins">\n        </ion-input>       \n       \n    </ion-item>\n    <ion-item>\n        <ion-icon color="facebook" name=\'logo-facebook\' item-start></ion-icon>\n      <ion-input placeholder="{{dataface}}" type="text" [(ngModel)]="sociaButton.face">\n        </ion-input>   \n       \n    </ion-item>\n    <ion-item>\n        <ion-icon color="twitter" name=\'logo-twitter\' item-start></ion-icon>\n      <ion-input placeholder="{{datatwitter}}" type="text" [(ngModel)]="sociaButton.twit">\n        </ion-input>     \n      \n    </ion-item>\n    <ion-item >   \n      <button  color="label-color" ion-button full (click)="socialMedia()" item-end>\n        <p style="font-family: Arial, Helvetica, sans-serif; color:#ce0e0e;">KAYDET</p>\n      </button>\n    </ion-item>\n  </ion-list>\n\n<ion-list>\n  <ion-list-header>\n    Kullanıcı Adımı Değiştir\n  </ion-list-header>\n  <ion-item>\n      <ion-icon color="dark" name=\'ios-person\' item-start></ion-icon>\n    <ion-input placeholder="Kullanıcı Adımı Değiştir " type="text" [(ngModel)]="bodyTwo.n_name">\n      </ion-input>       \n  </ion-item>\n  <ion-item >   \n    <button  color="label-color" ion-button (click)="kullaniciDegistir()" item-end>\n      <p style="font-family: Arial, Helvetica, sans-serif; color:#ce0e0e;">DEĞİŞTİR</p>\n    </button>\n  </ion-item>\n</ion-list>\n\n<ion-list>\n  <ion-list-header>\n    Şifremi Değiştir\n  </ion-list-header>\n  <ion-item>\n    <ion-icon color="dark" name=\'ios-lock\' item-start></ion-icon>\n    <ion-input placeholder="Şifremi Değiştir " type="password" [(ngModel)]="bodyThree.new_pass">\n    </ion-input>  \n  </ion-item>\n  <ion-item>\n    <ion-icon color="dark" name=\'ios-lock\' item-start></ion-icon>\n    <ion-input placeholder="Şifre Tekrar " type="password" [(ngModel)]="rp">\n    </ion-input>   \n  </ion-item>\n  <ion-item >   \n    <button  color="label-color" ion-button (click)="sifreDegis()" item-end>\n      <p style="font-family: Arial, Helvetica, sans-serif; color:#ce0e0e;">DEĞİŞTİR</p>\n    </button>\n  </ion-item>\n</ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\bio-duzenle\bio-duzenle.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], BioDuzenlePage);
    return BioDuzenlePage;
}());

//# sourceMappingURL=bio-duzenle.js.map

/***/ }),

/***/ 188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopupModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var PopupModalPage = /** @class */ (function () {
    function PopupModalPage(navCtrl, navParams, http, loadingCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.bilgi = { "muzik_adi": this.muzik_adi, "muzik_yazar": this.sarkiadi };
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
    PopupModalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PopupModalPage');
    };
    PopupModalPage.prototype.showConfirmAlert = function (ID) {
        window.localStorage.setItem("idx", ID);
        this.CategoryId = window.localStorage.getItem("idx");
        console.log(this.CategoryId);
    };
    PopupModalPage.prototype.hata0 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: 'İçeriğiniz başarıyla güncellendi.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    PopupModalPage.prototype.hata1 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: 'Beklenmeyen bir hata oluştu.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    PopupModalPage.prototype.kontrol = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: '"Müzik adı" ve "Söz yazarı" kısmını boş bırakmayınız.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    PopupModalPage.prototype.Yolla = function (ID) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "İçeriğiniz değiştiriliyor"
        });
        loader.present();
        if (this.bilgi.muzik_adi != null && this.bilgi.muzik_yazar != null) {
            var baseURL = 'https://ilkcandogan.com/';
            var baseParams = 'video_duzenle.php';
            var body = {
                "video_id": encodeURI(this.mId),
                "muzik_adi": encodeURI(this.bilgi.muzik_adi),
                "muzik_yazar": encodeURI(this.bilgi.muzik_yazar),
                "kategori_id": this.CategoryId
            };
            var testURL = (baseURL + baseParams);
            var authHeader = window.localStorage.getItem('token');
            var headersObj = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
            headersObj.append('Authorization', authHeader);
            this.http.post(testURL, body, { headers: headersObj })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                _this.hataKontrol = res;
                if (_this.hataKontrol["hata"] == "0") {
                    _this.hata0();
                    loader.dismiss();
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                }
                else if (_this.hataKontrol["hata"] == "1") {
                    _this.hata1();
                    loader.dismiss();
                }
                else if (_this.hataKontrol["hata"] == "2") {
                    _this.hata1();
                    loader.dismiss();
                }
                else {
                    _this.hata1();
                    loader.dismiss();
                }
                console.log(res);
            });
        }
        else {
            this.kontrol();
            loader.dismiss();
        }
    };
    PopupModalPage.prototype.kategoriYukle = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Yükleniyor"
        });
        loader.present();
        var baseURL = 'https://ilkcandogan.com/muzik_kategorileri.php';
        this.http.get(baseURL)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res);
            _this.kategoriGetir = res.bilgi;
            loader.dismiss();
        });
    };
    PopupModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-popup-modal',template:/*ion-inline-start:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\popup-modal\popup-modal.html"*/'<ion-header>\n  <ion-navbar color="dark">\n    <ion-title color="dark">Video Duzenle</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-item class="bg-imagelogin">\n    <ion-label color="television" floating>Söz Yazarı : {{meName}}</ion-label>\n    <ion-input color="television" type="username" [(ngModel)]="bilgi.muzik_yazar">\n    </ion-input>\n  </ion-item>\n  <ion-item class="bg-imagelogin">\n    <ion-label color="television" floating>Müzik Adı : {{muName}}</ion-label>\n    <ion-input color="television" type="username" [(ngModel)]="bilgi.muzik_adi">\n    </ion-input>\n  </ion-item>\n  <ion-list radio-group>\n    <br>\n    <ion-title center>Kategori Seç</ion-title>\n    <br>\n    <ion-list *ngFor="let user of kategoriGetir">\n      <ion-item>\n        <ion-label>{{user.CATEGORY}}</ion-label>\n        <ion-radio (ionSelect)=\'showConfirmAlert(user.ID)\'></ion-radio>\n      </ion-item>\n    </ion-list>\n\n\n  </ion-list>\n\n\n  <ion-card>\n    <ion-item>\n      <br>\n      <p><span>Söz Müzik :</span> <b><span>{{meName}}</span></b></p>\n      <br>\n      <p><span>Şarkı Adı :</span> <b><span>{{muName}}</span></b></p>\n      <br>\n      <p><span>Tür :</span> <b><span>{{catname}}</span></b></p>\n    </ion-item>\n    <div>\n      <video width="900" height="180" controls poster="{{thumb}}">\n        <source src="{{video}}" type="video/mp4">\n        Videonuz Yüklenemiyor\n      </video>\n    </div>\n    <ion-card-content>\n      <p><b><span>Yüklenme Tarihi : </span></b> <span>{{uploaddate}}</span></p>\n      <br>\n      <button ion-button (click)="Yolla()">Düzenle</button>\n      \n    </ion-card-content>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\popup-modal\popup-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */]])
    ], PopupModalPage);
    return PopupModalPage;
}());

//# sourceMappingURL=popup-modal.js.map

/***/ }),

/***/ 189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MpCommentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__popover_popover__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MpCommentPage = /** @class */ (function () {
    function MpCommentPage(navCtrl, navParams, http, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.diger = window.localStorage.getItem('idf');
        this.fakeUsers = new Array;
        this.lottieConfig = {
            path: 'assets/imgs/commentskeleton.json',
            renderer: 'canvas',
            autoplay: true,
            loop: true
        };
        this.mId = navParams.get('mId');
        this.noRecord = false;
        this.cek();
    }
    MpCommentPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MpCommentPage');
    };
    MpCommentPage.prototype.cek = function () {
        var _this = this;
        this.SSID = 0;
        var baseURL = 'https://ilkcandogan.com/video_yorumlar.php?muzik_id=';
        var authHeader = JSON.stringify(window.localStorage.getItem('token'));
        var headersObj = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headersObj.append('Authorization', authHeader);
        this.http.get(baseURL + this.mId + "&start=" + this.SSID, { headers: headersObj })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res);
            _this.kullaniciYorum = res.comments;
            _this.SSID = res.SON_ID;
            console.log(_this.kullaniciYorum);
        }, function (err) {
        });
    };
    MpCommentPage.prototype.doInfinite = function (InfiniteScroll) {
        var _this = this;
        return new Promise(function (resolve) {
            setTimeout(function () {
                var baseURL = 'https://ilkcandogan.com/video_yorumlar.php?muzik_id=';
                var headersObj = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
                var authHeader = JSON.stringify(window.localStorage.getItem('token'));
                headersObj.append('Authorization', authHeader);
                _this.http.get(baseURL + _this.mId + "&start=" + _this.SSID, { headers: headersObj })
                    .map(function (res) { return res.json(); })
                    .subscribe(function (res) {
                    console.log(res);
                    _this.resposeData = res;
                    _this.veri = _this.resposeData.comments;
                    if (_this.resposeData.comments !== null) {
                        if (_this.veri.length > 0) {
                            for (var index = 0; index < _this.veri.length; index++) {
                                _this.kullaniciYorum.push(_this.veri[index]);
                            }
                        }
                        else {
                            _this.noRecord = true;
                        }
                    }
                    _this.SSID = res.SON_ID;
                    InfiniteScroll.complete();
                }, function (err) {
                });
            }, 4000);
        });
    };
    MpCommentPage.prototype.yorumYap = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Yorumunuz Yükleniyor."
        });
        loader.present();
        var baseURL = 'https://ilkcandogan.com/';
        var baseParams = 'video_yorum_yap.php';
        var testURL = (baseURL + baseParams);
        var authHeader = JSON.stringify(window.localStorage.getItem('token'));
        var body = {
            "muzik_id": this.mId,
            "yorum": this.comment
        };
        var headersObj = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headersObj.append('Authorization', authHeader);
        this.http.post(testURL, body, { headers: headersObj })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.cek();
            loader.dismiss();
            _this.comment = "";
            console.log(res);
        });
    };
    //#endregion
    MpCommentPage.prototype.presentPopover = function (myEvent, myEvent2, myEvent3) {
        this.PId = myEvent;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__popover_popover__["a" /* PopoverPage */], {
            idP: myEvent,
            Nickname: myEvent2,
            image: myEvent3
        });
    };
    MpCommentPage.prototype.commentYanitla = function (N_NAME) {
        var yComment = "@" + N_NAME;
        this.comment = yComment;
    };
    MpCommentPage.prototype.Sil = function (COMMENT_ID) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Yorumunuz Siliniyor."
        });
        loader.present();
        var yorum_id = COMMENT_ID;
        var sil = "1";
        var baseURL = 'https://ilkcandogan.com/';
        var baseParams = 'video_yorum_duzenle.php';
        var testURL = (baseURL + baseParams);
        var authHeader = window.localStorage.getItem('token');
        var headersObj = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headersObj.append('Authorization', authHeader);
        var body = {
            "yorum_id": yorum_id,
            "sil": sil
        };
        console.log(yorum_id);
        this.http.post(testURL, body, { headers: headersObj })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.cek();
            loader.dismiss();
            console.log(res);
        });
    };
    MpCommentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-mp-comment',template:/*ion-inline-start:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\mp-comment\mp-comment.html"*/'<!--\n  Generated template for the YorumlarPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="dark">\n    <ion-title center>Yorumlar</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n  <ion-content padding>\n    <div class="canvasi" *ngIf="!kullaniciYorum">\n      <lottie-animation-view *ngIf="!kullaniciYorum"\n      [options]="lottieConfig"\n      [width]="300"\n      [height]="300"\n      >\n    </lottie-animation-view>\n    </div>\n      \n   <ion-card *ngFor="let user of kullaniciYorum">\n    <ion-item>\n      <ion-avatar item-start>\n        <img src="{{user.IMAGE}}" (click)="presentPopover(user.USER_ID,user.N_NAME,user.IMAGE)">\n      </ion-avatar>\n      <h2>{{user.N_NAME}}</h2>\n      <ion-note>\n        {{user.DATE}}\n       </ion-note>\n    </ion-item>\n    <ion-card-content>\n      <p>{{user.COMMENT}}</p>\n    </ion-card-content>\n    <ion-row>\n      <ion-col col-3 *ngIf="user.USER_ID != diger">\n        <button ion-button color="primary"   clear small icon-left (click)="commentYanitla(user.N_NAME)">\n        <ion-icon item-left name=\'text\'></ion-icon>\n        Yanıtla\n      </button>\n      </ion-col>\n      <ion-col col-3>\n        <button ion-button color="primary"  clear small icon-left (click)="Sil(user.COMMENT_ID)">\n        <ion-icon item-right name=\'ios-trash\'></ion-icon>\n        Sil\n      </button>\n      </ion-col>\n    </ion-row>      \n    <div class="divider div-transparent"></div>\n  </ion-card>\n\n\n \n   \n \n        <strong><p *ngIf="noRecord" style="color:rgb(160, 154, 154);  text-align:center;">Daha Fazla Kullanıcı Yorumu Bulunmamaktadır</p></strong>\n    \n\n      <ion-infinite-scroll style="height:5vh;" (ionInfinite)="doInfinite($event)" *ngIf="!noRecord">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n      </ion-infinite-scroll>\n     \n  </ion-content>\n  \n  <ion-footer>\n      <ion-toolbar>\n        <ion-item >\n          <ion-input placeholder="Yorumunuz" type="username" [(ngModel)]="comment" floating>     \n          </ion-input> \n          \n          <button ion-button clear xl item-right (click)="yorumYap()"><strong>Yorum Yap</strong><p></p> \n            <ion-icon name="ios-send">           \n            </ion-icon>\n            \n\n          </button> \n        </ion-item>\n          \n      </ion-toolbar>\n    </ion-footer>\n    '/*ion-inline-end:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\mp-comment\mp-comment.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], MpCommentPage);
    return MpCommentPage;
}());

//# sourceMappingURL=mp-comment.js.map

/***/ }),

/***/ 190:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FullScreenPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the FullScreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FullScreenPage = /** @class */ (function () {
    function FullScreenPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    FullScreenPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FullScreenPage');
    };
    FullScreenPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-full-screen',template:/*ion-inline-start:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\full-screen\full-screen.html"*/'<!--\n  Generated template for the FullScreenPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>fullScreen</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\full-screen\full-screen.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], FullScreenPage);
    return FullScreenPage;
}());

//# sourceMappingURL=full-screen.js.map

/***/ }),

/***/ 191:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoYukleicerikPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_media_capture__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_media__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_transfer__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__home_home__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_admob_free__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic_progress_bar__ = __webpack_require__(276);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};












var MEDIA_FILES_KEY = 'mediaFiles';
var VideoYukleicerikPage = /** @class */ (function () {
    function VideoYukleicerikPage(navCtrl, navParams, mediaCapture, storage, file, media, transfer, loadingCtrl, toastCtrl, http, admobFree, _zone, _progressBar) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.mediaCapture = mediaCapture;
        this.storage = storage;
        this.file = file;
        this.media = media;
        this.transfer = transfer;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.http = http;
        this.admobFree = admobFree;
        this._zone = _zone;
        this._progressBar = _progressBar;
        this.bilgi = { "muzik_adi": this.muzik_adi, "yazar_adi": this.yazar_adi };
        this.dizinBilgileri = { "dizin": this.dizin };
        var insterstiteal = {
            id: "ca-app-pub-2851043339565426/2201081457",
            isTesting: false,
            autoShow: true
        };
        this.admobFree.interstitial.config(insterstiteal);
        this.admobFree.interstitial.prepare()
            .then(function () {
            // banner Ad is ready
            // if we set autoShow to false, then we will need to call the show method here
        })
            .catch(function (e) { return console.log(e); });
        this.kategoriYukle();
        this.image = window.localStorage.getItem("image");
        this.Nname = window.localStorage.getItem('n_name');
        this.pbool = false;
        this.isenabled = false;
    }
    VideoYukleicerikPage_1 = VideoYukleicerikPage;
    VideoYukleicerikPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get(MEDIA_FILES_KEY).then(function (res) {
            _this.mediaFiles = JSON.parse(res) || [];
        });
    };
    VideoYukleicerikPage.prototype.videoYukle = function () {
        this.navCtrl.push(VideoYukleicerikPage_1);
    };
    VideoYukleicerikPage.prototype.kategoriYukle = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Yükleniyor"
        });
        loader.present();
        var baseURL = 'https://ilkcandogan.com/muzik_kategorileri.php';
        this.http.get(baseURL)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res);
            _this.kategoriGetir = res.bilgi;
            loader.dismiss();
        });
    };
    VideoYukleicerikPage.prototype.showConfirmAlert = function (ID) {
        window.localStorage.setItem("idx", ID);
        this.CategoryId = window.localStorage.getItem("idx");
    };
    VideoYukleicerikPage.prototype.captureVideo = function (ID) {
        var _this = this;
        if (this.bilgi.muzik_adi != "" && this.bilgi.yazar_adi) {
            try {
                var options = {
                    quality: 1,
                    limit: 1,
                    duration: 90
                };
                this.mediaCapture.captureVideo(options).then(function (res) {
                    var capturedFile = res[0];
                    var fileName = capturedFile.name;
                    var dir = capturedFile['localURL'].split('/');
                    dir.pop();
                    var fromDirectory = dir.join('/');
                    var toDirectory = _this.file.dataDirectory;
                    _this.file.copyFile(fromDirectory, fileName, toDirectory, fileName).then(function (res) {
                        var fileTransfer = _this.transfer.create();
                        var options1 = {
                            fileKey: 'video',
                            chunkedMode: false,
                            httpMethod: 'post',
                            mimeType: "video/mp4",
                            fileName: 'name.mp4',
                            headers: {
                                'Authorization': localStorage.getItem('token'),
                                'API_KEY': '15386b116a2a9e75fbd890841ed50aca'
                            },
                        };
                        /* muzik_adi,yazar_adi,kategori_id*/
                        var encodeOptions = _this.bilgi.muzik_adi + "&" +
                            "yazar_adi=" + _this.bilgi.yazar_adi + "&" + "kategori_id=";
                        var lastEncodeUri = encodeURI(encodeOptions);
                        /*
                                      let loader = this.loadingCtrl.create({
                                        content: "Yükleniyor"
                                      });
                                      loader.present();
                                      */
                        fileTransfer.onProgress(function (progressEvent) {
                            _this.pbool = true;
                            var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                            _this.progress = perc;
                        });
                        fileTransfer.upload(res.nativeURL, 'http://165.22.77.175/server2/video_yukle.php?muzik_adi=' + lastEncodeUri + _this.CategoryId, options1)
                            .then(function (data) {
                            _this.videoData = JSON.parse(data.response);
                            /*  loader.dismiss();*/
                            window.localStorage.removeItem("idx");
                            if (_this.videoData.hata == "3") {
                                _this.hata0();
                                /*  loader.dismiss();*/
                            }
                            if (_this.videoData.hata == "0") {
                                _this.hata0();
                                /*   loader.dismiss();*/
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__home_home__["a" /* HomePage */]);
                            }
                            if (_this.videoData.hata == "8") {
                                _this.hata8();
                                /*   loader.dismiss();*/
                            }
                        }, function (err) {
                            _this.hata3();
                        });
                    }, function (err) {
                        _this.hata3();
                    });
                }, function (err) { return console.error(err); });
            }
            catch (_a) {
                console.log(console.error());
            }
        }
        else {
            this.hata3();
        }
    };
    VideoYukleicerikPage.prototype.play = function (myFile) {
        try {
            if (myFile.name.indexOf('.mp4') > -1) {
                var audioFile = this.media.create(myFile.localURL);
                audioFile.play();
            }
            else {
                var path = this.file.dataDirectory + myFile.name;
                var url = path.replace(/^file:\/\//, '');
                var video = this.myVideo.nativeElement;
                video.src = url;
                this.upload();
                video.play();
            }
        }
        catch (_a) {
            console.log(console.error());
        }
    };
    VideoYukleicerikPage.prototype.storeMediaFiles = function (files) {
        var _this = this;
        try {
            this.storage.get(MEDIA_FILES_KEY).then(function (res) {
                if (res) {
                    var arr = JSON.parse(res);
                    arr = arr.concat(files);
                    _this.storage.set(MEDIA_FILES_KEY, JSON.stringify(arr));
                }
                else {
                    _this.storage.set(MEDIA_FILES_KEY, JSON.stringify(files));
                }
                _this.mediaFiles = _this.mediaFiles.concat(files);
            });
        }
        catch (_a) {
            console.log(console.error());
        }
    };
    VideoYukleicerikPage.prototype.hata3 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: 'Göndermeye çalıştığınız dosya bozuk veya kayıp.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    VideoYukleicerikPage.prototype.hata8 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: 'Video Bilgileriniz Eksik.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    VideoYukleicerikPage.prototype.hata0 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: 'Videonuz Başarıyla Yüklendi.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    VideoYukleicerikPage.prototype.upload = function () {
        var fileTransfer = this.transfer.create();
        var options1 = {
            fileKey: 'video',
            chunkedMode: false,
            httpMethod: 'post',
            mimeType: "video/mp4",
            fileName: 'name.mp4',
            headers: { 'Authorization': localStorage.getItem('token') },
        };
        fileTransfer.upload('mediaFiles [];', 'https://ilkcandogan.com/video_yukle.php', options1)
            .then(function (data) {
            // success
        }, function (err) {
            // error
        });
    };
    ;
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myvideo'),
        __metadata("design:type", Object)
    ], VideoYukleicerikPage.prototype, "myVideo", void 0);
    VideoYukleicerikPage = VideoYukleicerikPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-video-yukleicerik',template:/*ion-inline-start:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\video-yukleicerik\video-yukleicerik.html"*/'<!--\n  Generated template for the VideoYukleicerikPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header >\n  <ion-navbar color="dark">\n    <ion-title style="margin-top:6%;">Video Yükle</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <div class="demo-container">\n        <div class="circle">\n          <div>\n            <div class="tag-hole"></div>\n            <div class="content">\n              <p style="font-size: 16px;">\n              Lütfen müzik ve yazar adı kısmını boş bırakmayınız.\n            </p>\n            </div>\n          </div>\n        </div>\n        </div>\n <br>\n  <ion-item class="bg-imagelogin">\n    <ion-label  color="television" floating>Müzik Adı</ion-label>\n    <ion-input color="television" type="username" [(ngModel)]="bilgi.muzik_adi">\n    </ion-input>\n  </ion-item>\n  <ion-item class="bg-imagelogin">\n    <ion-label  color="television" floating>Söz Yazarı</ion-label>\n    <ion-input  color="television" type="username" [(ngModel)]="bilgi.yazar_adi">\n    </ion-input>\n\n  </ion-item>\n  <br>\n  <br>\n  <ion-list radio-group>\n    <br>\n    <ion-title>Şarkı Türü</ion-title>\n    <br>\n    <ion-list *ngFor="let user of kategoriGetir">\n      <ion-item>\n        <ion-label>{{user.CATEGORY}}</ion-label>\n        <ion-radio (ionSelect)=\'showConfirmAlert(user.ID)\' value="{{user.ID}}"></ion-radio>\n      </ion-item>\n    </ion-list>\n</ion-list>\n<div class="progress-outer" *ngIf="pbool">\n  <div class="progress-inner" [style.width]="progress + \'%\'" *ngIf="pbool">\n      {{progress}}%\n  </div>\n</div>\n\n\n<button ion-button full (click)=\'captureVideo()\' [disabled]="pbool">Video Çek ve Yükle</button>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\video-yukleicerik\video-yukleicerik.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_media_capture__["a" /* MediaCapture */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_media__["a" /* Media */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_7__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_admob_free__["a" /* AdMobFree */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_10_ionic_progress_bar__["b" /* SimpleProgressBarProvider */]])
    ], VideoYukleicerikPage);
    return VideoYukleicerikPage;
    var VideoYukleicerikPage_1;
}());

//# sourceMappingURL=video-yukleicerik.js.map

/***/ }),

/***/ 192:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReklamPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_admob_free__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ReklamPage = /** @class */ (function () {
    function ReklamPage(navCtrl, navParams, admobFree, http, loadingCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.admobFree = admobFree;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.count = 0;
        this.reklamString = "Reklamınız hazırlanıyor lütfen bekleyiniz.";
        this.reklam2String = "Tebrikler Coin Kazandınız. !";
        this.lottieConfig2 = {
            path: 'assets/imgs/reklamload.json',
            renderer: 'canvas',
            autoplay: true,
            loop: true
        };
        this.rewardedVideoBaslangic();
    }
    ReklamPage.prototype.istek = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Lütfen Bekleyiniz."
        });
        var baseURL = 'https://ilkcandogan.com/';
        var baseParams = 'coin_reward.php';
        var testURL = (baseURL + baseParams);
        var authHeader = JSON.stringify(window.localStorage.getItem('token'));
        var body = {};
        var headersObj = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headersObj.append('Authorization', authHeader);
        this.http.post(testURL, JSON.stringify(body), { headers: headersObj })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.control = res.response;
            if (_this.control.hata == "0") {
                _this.hata0();
                loader.dismiss();
            }
            if (_this.control.hata == "2") {
                _this.hata1();
                loader.dismiss();
            }
            console.log(res);
        });
    };
    ReklamPage.prototype.rewardedVideoBaslangic = function () {
        var _this = this;
        var RewardConf = {
            id: "ca-app-pub-2851043339565426/1928293298",
            isTesting: true,
            autoShow: true
        };
        this.admobFree.rewardVideo.config(RewardConf);
        this.admobFree.rewardVideo.prepare()
            .then(function () {
        })
            .catch(function (e) { return alert(JSON.stringify(e)); });
        /*admob.rewardvideo.events.LOAD_FAIL */
        document.addEventListener('admob.rewardvideo.events.LOAD_FAIL', function (err) {
            _this.hata2();
        });
        document.addEventListener('admob.rewardvideo.events.REWARD', function () {
            _this.count++;
            if (_this.count == 1) {
                _this.istek();
                _this.reklamString = _this.reklam2String;
                _this.hata0();
            }
        });
    };
    ReklamPage.prototype.hata0 = function () {
        var toast = this.toastCtrl.create({
            message: 'Tebrikler coin Kazandınız.',
            duration: 2000,
            position: 'top'
        });
    };
    ReklamPage.prototype.hata1 = function () {
        var toast = this.toastCtrl.create({
            message: 'Bugünlük reklam izleme hakkınız dolmuştur.',
            duration: 2000,
            position: 'top'
        });
    };
    ReklamPage.prototype.hata2 = function () {
        var toast = this.toastCtrl.create({
            message: 'Lütfen daha sonra tekrar deneyiniz.',
            duration: 2000,
            position: 'top'
        });
    };
    ReklamPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-reklam',template:/*ion-inline-start:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\reklam\reklam.html"*/'<!--\n  Generated template for the ReklamPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header color="dark" >\n  <ion-navbar color="dark" > \n      <button ion-button icon-only menuToggle>\n          <ion-icon name="menu"></ion-icon>\n        </button> \n    <ion-title>reklam</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n\n<ion-content>\n    <lottie-animation-view \n      style="margin-top: 10%"\n     [options]="lottieConfig2" \n     [width]="300" \n     [height]="300">\n      </lottie-animation-view>\n      <p style="font-size: 24px; color:#564f4f; width:100%; text-align:center;">{{reklamString}}</p>\n    \n</ion-content>'/*ion-inline-end:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\reklam\reklam.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_admob_free__["a" /* AdMobFree */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */]])
    ], ReklamPage);
    return ReklamPage;
}());

//# sourceMappingURL=reklam.js.map

/***/ }),

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HabericerikPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_admob_free__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HabericerikPage = /** @class */ (function () {
    function HabericerikPage(navCtrl, navParams, http, admobFree) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.admobFree = admobFree;
        var insterstiteal = {
            id: "ca-app-pub-2851043339565426/2073003226",
            isTesting: false,
            autoShow: true
        };
        this.admobFree.interstitial.config(insterstiteal);
        this.admobFree.interstitial.prepare()
            .then(function () {
            // banner Ad is ready
            // if we set autoShow to false, then we will need to call the show method here
        })
            .catch(function (e) { return console.log(e); });
        this.cek();
    }
    HabericerikPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HabericerikPage');
    };
    HabericerikPage.prototype.cek = function () {
        var _this = this;
        this.haberId = window.localStorage.getItem("haberId");
        var baseURL = 'https://ilkcandogan.com/icerik.php';
        this.http.get(baseURL + "?id=" + this.haberId)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res);
            _this.habericerik = res.bilgi;
        }, function (err) {
        });
    };
    HabericerikPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-habericerik',template:/*ion-inline-start:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\habericerik\habericerik.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n    <ion-title center style="margin-top:6%;">İçerik</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n  <ion-card *ngFor="let user of habericerik">\n    <img height="240px;" src="{{user.RESIM1}}" onerror="this.src=\'assets/imgs/nophoto.png\';" />\n    <ion-card-content>\n      <ion-card-title>\n       {{user.TARIH}}\n        </ion-card-title>\n      <br>\n      <b><p>{{user.ICERIK}}</p></b>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\habericerik\habericerik.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_admob_free__["a" /* AdMobFree */]])
    ], HabericerikPage);
    return HabericerikPage;
}());

//# sourceMappingURL=habericerik.js.map

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KategoriicerilPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__popover_popover__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__yorumlar_yorumlar__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__likelist_likelist__ = __webpack_require__(109);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var KategoriicerilPage = /** @class */ (function () {
    function KategoriicerilPage(navCtrl, navParams, http, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.icerikYukle();
        this.noRecord = false;
    }
    KategoriicerilPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad KategoriicerilPage');
    };
    KategoriicerilPage.prototype.toggleIcon = function (MUSIC_ID, L) {
        var _this = this;
        if (L === 'ios-thumbs-up-outline')
            try {
                var begeni = "1";
                var baseURL = 'https://ilkcandogan.com/';
                var baseParams = 'video_begeni.php';
                var testURL = (baseURL + baseParams);
                var authHeader = window.localStorage.getItem('token');
                var headersObj = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
                headersObj.append('Authorization', authHeader);
                var body = {
                    "muzik_id": MUSIC_ID,
                    "begeni": begeni
                };
                this.http.post(testURL, body, { headers: headersObj })
                    .map(function (res) { return res.json(); })
                    .subscribe(function (res) {
                    _this.homeLike = res;
                    _this.buttonIcon = "ios-thumbs-up";
                    _this.icerikYukle();
                    if (_this.homeLike["hata"] == "0") {
                        _this.begen0();
                    }
                    else {
                        console.log("İnternet Bağlantınızı Kontrol Ediniz.");
                    }
                    console.log(res);
                });
            }
            catch (_a) {
            }
        else if (L === 'ios-thumbs-up') {
            try {
                var begeni = "0";
                var baseURL = 'https://ilkcandogan.com/';
                var baseParams = 'video_begeni.php';
                var testURL = (baseURL + baseParams);
                var authHeader = window.localStorage.getItem('token');
                var headersObj = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
                headersObj.append('Authorization', authHeader);
                var body = {
                    "muzik_id": MUSIC_ID,
                    "begeni": begeni
                };
                this.http.post(testURL, body, { headers: headersObj })
                    .map(function (res) { return res.json(); })
                    .subscribe(function (res) {
                    _this.homeLike = res;
                    _this.buttonIcon = "ios-thumbs-up-outline";
                    _this.icerikYukle();
                    console.log(res);
                });
            }
            catch (_b) {
            }
        }
    };
    KategoriicerilPage.prototype.likepage = function (musicid) {
        this.likepagemusicid = musicid;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__likelist_likelist__["a" /* LikelistPage */], {
            likepagemusicid: musicid,
        });
    };
    KategoriicerilPage.prototype.bildirilerTetikle = function (MUSIC_ID) {
        var _this = this;
        var baseURL = 'https://ilkcandogan.com/';
        var baseParams = 'video_sikayet.php';
        var testURL = (baseURL + baseParams);
        var authHeader = window.localStorage.getItem('token');
        var headersObj = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headersObj.append('Authorization', authHeader);
        var body = {
            "video_id": MUSIC_ID
        };
        this.http.post(testURL, body, { headers: headersObj })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.bildiriDegisken = res;
            console.log(_this.bildiriDegisken);
            if (_this.bildiriDegisken["hata"] == "0") {
                _this.hatabildir0();
            }
            else if (_this.bildiriDegisken["hata"] == "3") {
                _this.hatabildir1();
            }
            else {
                console.log("İnternet Bağlantınızı Kontrol Ediniz.");
            }
            console.log(res);
        });
    };
    KategoriicerilPage.prototype.hatabildir0 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: 'Kullanıcı Şikayet Edildi',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    KategoriicerilPage.prototype.begen0 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: 'Videoyu Beğendiniz.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    KategoriicerilPage.prototype.begen9 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: 'Videoyu Zaten Beğendiniz.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    KategoriicerilPage.prototype.hatabildir1 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: 'Kullanıcıyı Zaten Şikayet Ettiniz.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    KategoriicerilPage.prototype.presentPopover = function (myEvent, myEvent2, myEvent3) {
        this.PId = myEvent;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__popover_popover__["a" /* PopoverPage */], {
            idP: myEvent,
            Nickname: myEvent2,
            image: myEvent3
        });
    };
    KategoriicerilPage.prototype.yorumlar = function (myEvent, sParam) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__yorumlar_yorumlar__["a" /* YorumlarPage */], {
            mId: myEvent,
            yanitla: sParam
        });
    };
    KategoriicerilPage.prototype.doInfinite = function (InfiniteScroll) {
        var _this = this;
        return new Promise(function (resolve) {
            setTimeout(function () {
                var baseURL = 'https://ilkcandogan.com/video_kategori.php';
                _this.http.get(baseURL + "?start=" + _this.SSID + "&kategori_id=" + _this.kid)
                    .map(function (res) { return res.json(); })
                    .subscribe(function (res) {
                    console.log(res);
                    _this.resposeData = res;
                    _this.veri = _this.resposeData.bilgi;
                    if (_this.resposeData.bilgi.N_NAME !== null) {
                        if (_this.resposeData.SON_ID !== null) {
                            for (var index = 0; index < _this.veri.length; index++) {
                                _this.kicerik.push(_this.veri[index]);
                            }
                        }
                        else {
                            _this.noRecord = true;
                        }
                    }
                    _this.SSID = res.SON_ID;
                    InfiniteScroll.complete();
                }, function (err) {
                });
            }, 4000);
        });
    };
    KategoriicerilPage.prototype.icerikYukle = function () {
        var _this = this;
        this.SSID = 0;
        this.kid = window.localStorage.getItem("kategoriid");
        var authHeader = JSON.stringify(window.localStorage.getItem('token'));
        var headersObj = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headersObj.append('Authorization', authHeader);
        var baseURL = 'https://ilkcandogan.com/video_kategori.php';
        this.http.get(baseURL + "?start=" + this.SSID + "&kategori_id=" + this.kid, { headers: headersObj })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res);
            _this.kicerik = res.bilgi;
            _this.SSID = res.SON_ID;
        }, function (err) {
        });
    };
    KategoriicerilPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-kategoriiceril',template:/*ion-inline-start:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\kategoriiceril\kategoriiceril.html"*/'<!--\n  Generated template for the KategoriicerilPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar color="dark">\n        <button ion-button menuToggle style="margin-top:6%;">\n          <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title center style="margin-top:6%;">Kategoriler</ion-title>\n      </ion-navbar>\n  \n  </ion-header>\n\n<ion-content>\n\n      <br>\n      <autoplay-content>\n      <ion-card *ngFor="let user of kicerik">\n    \n        <ion-item>\n          <ion-avatar item-start>\n            <img src="{{user.IMAGE}}" (click)="presentPopover(user.USER_ID,user.N_NAME,user.IMAGE)">\n          </ion-avatar>\n          <strong></strong>\n          <strong><h2>{{user.N_NAME}}</h2></strong>\n    \n        </ion-item>   \n        <div>\n        <video  poster="{{user.THUMB}}">\n            <source src="{{user.VIDEO}}" type="video/mp4" style="height:100%;">\n            Videonuz Yüklenemiyor\n          </video>\n        </div>\n        <ion-card-content>\n          <ion-chip color="label-color">\n            <ion-icon name="md-time"></ion-icon>\n            <ion-label color="danger">\n              <p style="color:rgb(0, 35, 102); margin: 1px;"><strong>Yüklenme Tarihi : </strong>{{user.UPLOAD_DATE}}</p>\n            </ion-label>\n          </ion-chip>\n        </ion-card-content>\n        <ion-card-content>\n          <ion-chip color="label-color">\n            <ion-icon name="md-create"></ion-icon>\n            <ion-label color="danger">\n              <p style="color:rgb(0, 35, 102); margin: 1px;"><strong>Söz Müzik : </strong>{{user.MELODY_NAME_SURNAME}}</p>\n            </ion-label>\n          </ion-chip>\n        </ion-card-content>\n        <ion-card-content>\n          <ion-chip color="label-color">\n            <ion-icon name="ios-microphone"></ion-icon>\n            <ion-label color="dark">\n              <p style="color:rgb(0, 35, 102); margin: 0px;"><strong>Şarkı Adı : </strong>{{user.MUSIC_NAME}}</p>\n            </ion-label>\n          </ion-chip>\n        </ion-card-content>\n        <ion-card-content>\n          <ion-chip color="label-color">\n            <ion-icon name="md-musical-notes"></ion-icon>\n            <ion-label color="dark">\n              <p style="color:rgb(0, 35, 102); margin: 1px;"><strong>Tür : </strong>{{user.CATEGORY_NAME}}</p>\n            </ion-label>\n          </ion-chip>\n        </ion-card-content>\n        <br>\n        <br>\n        <p style="margin-left:5%; color: gray;" (click)="likepage(user.MUSIC_ID)">{{user.LIKES}} Beğenme</p>\n        <ion-row>\n          <ion-col>\n            <button ion-button color="primary" clear small icon-start (click)="toggleIcon(user.MUSIC_ID,user.L)">\n              <ion-icon [name]="user.L"></ion-icon>\n              BEĞEN\n            </button>\n          </ion-col>\n          <ion-col>\n            <button ion-button color="primary" clear small icon-start (click)="yorumlar(user.MUSIC_ID)">\n              <ion-icon name=\'text\'></ion-icon>\n              Yorum Yap\n              &nbsp;<ion-badge item-end>{{user.COMMENT_TOTAL}}</ion-badge>\n            </button>\n    \n          </ion-col>\n          <ion-col>\n            <button ion-button color="primary" clear small icon-start (click)="bildirilerTetikle(user.MUSIC_ID)">\n              <ion-icon name=\'ios-flame\'></ion-icon>\n              Bildir\n            </button>\n          </ion-col>\n    \n        </ion-row>\n      </ion-card>\n    </autoplay-content>\n      <div class="divider div-transparent"></div>\n     \n      <strong><p *ngIf="noRecord" style="color:rgb(160, 154, 154); margin-top:6px; text-align:center;">Bu Kategoride Daha fazla gönderi Bulunmamaktadır.</p></strong>\n      <ion-infinite-scroll style="height:5vh;" (ionInfinite)="doInfinite($event)" *ngIf="!noRecord">\n          <ion-infinite-scroll-content loadingSpinner="crescent" loadingText="Yükleniyor...">\n          </ion-infinite-scroll-content>\n        </ion-infinite-scroll>\n     \n</ion-content>\n'/*ion-inline-end:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\kategoriiceril\kategoriiceril.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */]])
    ], KategoriicerilPage);
    return KategoriicerilPage;
}());

//# sourceMappingURL=kategoriiceril.js.map

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MuzikAraPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__popover_popover__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__yorumlar_yorumlar__ = __webpack_require__(75);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var MuzikAraPage = /** @class */ (function () {
    function MuzikAraPage(navCtrl, navParams, http, toastController) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.toastController = toastController;
        this.bilgi = { "text": this.text };
        this.record = false;
        this.lottieConfig = {
            path: 'assets/imgs/search.json',
            renderer: 'canvas',
            autoplay: true,
            loop: true
        };
        this.lottieConfig3 = {
            path: 'assets/imgs/notfound.json',
            renderer: 'canvas',
            autoplay: true,
            loop: true
        };
        this.noRecord = false;
    }
    MuzikAraPage.prototype.handleAnimation = function (anim) {
        this.anim = anim;
    };
    MuzikAraPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MuzikAraPage');
    };
    MuzikAraPage.prototype.toggleIcon = function (MUSIC_ID, L) {
        var _this = this;
        if (L === 'ios-thumbs-up-outline')
            try {
                var begeni = "1";
                var baseURL = 'https://ilkcandogan.com/';
                var baseParams = 'video_begeni.php';
                var testURL = (baseURL + baseParams);
                var authHeader = window.localStorage.getItem('token');
                var headersObj = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
                headersObj.append('Authorization', authHeader);
                var body = {
                    "muzik_id": MUSIC_ID,
                    "begeni": begeni
                };
                this.http.post(testURL, body, { headers: headersObj })
                    .map(function (res) { return res.json(); })
                    .subscribe(function (res) {
                    _this.homeLike = res;
                    _this.buttonIcon = "ios-thumbs-up";
                    _this.muzikAra();
                    if (_this.homeLike["hata"] == "0") {
                        _this.begen0();
                    }
                    else {
                        console.log("İnternet Bağlantınızı Kontrol Ediniz.");
                    }
                    console.log(res);
                });
            }
            catch (_a) {
            }
        else if (L === 'ios-thumbs-up') {
            try {
                var begeni = "0";
                var baseURL = 'https://ilkcandogan.com/';
                var baseParams = 'video_begeni.php';
                var testURL = (baseURL + baseParams);
                var authHeader = window.localStorage.getItem('token');
                var headersObj = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
                headersObj.append('Authorization', authHeader);
                var body = {
                    "muzik_id": MUSIC_ID,
                    "begeni": begeni
                };
                this.http.post(testURL, body, { headers: headersObj })
                    .map(function (res) { return res.json(); })
                    .subscribe(function (res) {
                    _this.homeLike = res;
                    _this.buttonIcon = "ios-thumbs-up-outline";
                    _this.muzikAra();
                    console.log(res);
                });
            }
            catch (_b) {
            }
        }
    };
    MuzikAraPage.prototype.bildirilerTetikle = function (MUSIC_ID) {
        var _this = this;
        var baseURL = 'https://ilkcandogan.com/';
        var baseParams = 'video_sikayet.php';
        var testURL = (baseURL + baseParams);
        var authHeader = window.localStorage.getItem('token');
        var headersObj = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headersObj.append('Authorization', authHeader);
        var body = {
            "video_id": MUSIC_ID
        };
        this.http.post(testURL, body, { headers: headersObj })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.bildiriDegisken = res;
            console.log(_this.bildiriDegisken);
            if (_this.bildiriDegisken["hata"] == "0") {
                _this.hatabildir0();
            }
            else if (_this.bildiriDegisken["hata"] == "3") {
                _this.hatabildir1();
            }
            else {
                console.log("İnternet Bağlantınızı Kontrol Ediniz.");
            }
            console.log(res);
        });
    };
    MuzikAraPage.prototype.hatabildir0 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Kullanıcı Şikayet Edildi',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    MuzikAraPage.prototype.begen0 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Videoyu Beğendiniz.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    MuzikAraPage.prototype.begen9 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Videoyu Zaten Beğendiniz.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    MuzikAraPage.prototype.hatabildir1 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Kullanıcıyı Zaten Şikayet Ettiniz.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    MuzikAraPage.prototype.muzikAra = function () {
        var _this = this;
        this.SSID = 0;
        this.encodet = encodeURI(this.bilgi.text);
        var authHeader = window.localStorage.getItem('token');
        var headersObj = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headersObj.append('Authorization', authHeader);
        var baseURL = 'https://ilkcandogan.com/ara.php?text=' + this.encodet;
        this.http.get(baseURL + "&start=" + this.SSID, { headers: headersObj })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res);
            _this.users = res.bilgi;
            _this.SSID = res.SON_ID;
            if (res.SON_ID == null) {
                _this.record = true;
            }
        }, function (err) {
        });
    };
    MuzikAraPage.prototype.presentPopover = function (myEvent, myEvent2, myEvent3) {
        this.PId = myEvent;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__popover_popover__["a" /* PopoverPage */], {
            idP: myEvent,
            Nickname: myEvent2,
            image: myEvent3
        });
    };
    MuzikAraPage.prototype.yorumlar = function (myEvent, sParam) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__yorumlar_yorumlar__["a" /* YorumlarPage */], {
            mId: myEvent,
            yanitla: sParam
        });
    };
    MuzikAraPage.prototype.doInfinite = function (InfiniteScroll) {
        var _this = this;
        return new Promise(function (resolve) {
            setTimeout(function () {
                var baseURL = 'https://ilkcandogan.com/ara.php?text=' + _this.encodet;
                _this.http.get(baseURL + "&start=" + _this.SSID)
                    .map(function (res) { return res.json(); })
                    .subscribe(function (res) {
                    console.log(res);
                    _this.resposeData = res;
                    _this.veri = _this.resposeData.bilgi;
                    if (_this.resposeData.bilgi.N_NAME !== null) {
                        if (_this.resposeData.SON_ID !== null) {
                            for (var index = 0; index < _this.veri.length; index++) {
                                _this.users.push(_this.veri[index]);
                            }
                        }
                        else {
                            _this.noRecord = true;
                        }
                    }
                    _this.SSID = res.SON_ID;
                    InfiniteScroll.complete();
                }, function (err) {
                });
            }, 4000);
        });
    };
    MuzikAraPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-muzik-ara',template:/*ion-inline-start:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\muzik-ara\muzik-ara.html"*/'\n<ion-header>\n  <ion-navbar BackButton color="dark">\n    <ion-item class="bg-imagelogin">\n      <ion-input color="television" type="username" placeholder="Şarkı adına göre ara" [(ngModel)]="bilgi.text">\n      </ion-input>\n    </ion-item>\n    <ion-buttons end>  \n        <div>\n          <button id="notification-button" ion-button clear xl (click)=\'muzikAra()\'>\n            <ion-icon name="search">\n            </ion-icon>\n          </button>\n        </div>\n      </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n   <div class="l" *ngIf="!users">\n  <lottie-animation-view *ngIf="!users"\n  [options]="lottieConfig"\n  [width]="300"\n  [height]="300"\n  >\n</lottie-animation-view>\n</div>\n<autoplay-content>\n  <ion-card *ngFor="let user of users" style="margin-top:40px; margin-bottom: 10px;">\n\n    <ion-item>\n      <ion-avatar item-start>\n        <img src="{{user.IMAGE}}" (click)="presentPopover(user.USER_ID,user.N_NAME,user.IMAGE)">\n      </ion-avatar>\n      <strong><h2>{{user.N_NAME}}</h2></strong>\n    </ion-item>\n    <div>\n      <video controls poster="{{user.THUMB}}">\n        <source src="{{user.VIDEO}}#t=0" type="video/mp4">\n        Videonuz Yüklenemiyor\n      </video>\n    </div>\n    <ion-card-content>\n      <ion-chip color="label-color">\n        <ion-icon name="md-time"></ion-icon>\n        <ion-label color="danger">\n          <p style="color:rgb(0, 35, 102);"><strong>Yüklenme Tarihi : </strong>{{user.UPLOAD_DATE}}</p>\n        </ion-label>\n      </ion-chip>\n    </ion-card-content>\n    <ion-card-content>\n      <ion-chip color="label-color">\n        <ion-icon name="md-create"></ion-icon>\n        <ion-label color="danger">\n          <p style="color:rgb(0, 35, 102);"><strong>Söz Müzik : </strong>{{user.MELODY_NAME_SURNAME}}</p>\n        </ion-label>\n      </ion-chip>\n    </ion-card-content>\n    <ion-card-content>\n      <ion-chip color="label-color">\n        <ion-icon name="ios-microphone"></ion-icon>\n        <ion-label color="dark">\n          <p style="color:rgb(0, 35, 102); "><strong>Şarkı Adı : </strong>{{user.MUSIC_NAME}}</p>\n        </ion-label>\n      </ion-chip>\n    </ion-card-content>\n    <ion-card-content>\n      <ion-chip color="label-color">\n        <ion-icon name="md-musical-notes"></ion-icon>\n        <ion-label color="dark">\n          <p style="color:rgb(0, 35, 102);"><strong>Tür : </strong>{{user.CATEGORY_NAME}}</p>\n        </ion-label>\n      </ion-chip>\n    </ion-card-content>\n    <br>\n    <br>\n    <ion-row>\n      <ion-col>\n        <button ion-button color="primary" clear small icon-start (click)="toggleIcon(user.MUSIC_ID,user.L)">\n          <ion-icon [name]="user.L"></ion-icon>\n          {{user.LIKES}}\n        </button>\n      </ion-col>\n      <ion-col>\n        <button ion-button color="primary" clear small icon-start (click)="yorumlar(user.MUSIC_ID)">\n          <ion-icon name=\'text\'></ion-icon>\n          Yorum Yap\n          &nbsp;<ion-badge item-end>{{user.COMMENT_TOTAL}}</ion-badge>\n        </button>\n\n      </ion-col>\n      <ion-col>\n        <button ion-button color="primary" clear small icon-start (click)="bildirilerTetikle(user.MUSIC_ID)">\n          <ion-icon name=\'ios-flame\'></ion-icon>\n          Bildir\n        </button>\n      </ion-col>\n\n    </ion-row>\n  </ion-card>\n</autoplay-content>\n  <br>\n  <br>\n  <br>\n  <strong><p *ngIf="noRecord" style="color:rgb(160, 154, 154); margin-top: 0px;  text-align:center;">Daha Fazla Arama Sonucu Bulunamamaktadır.</p></strong>\n  <br>\n \n    <lottie-animation-view *ngIf="record" [options]="lottieConfig3" [width]="300" [height]="400">\n    </lottie-animation-view>\n    <p *ngIf="record" style="font-size: 16px; color:#ce0e0e; width:100%; text-align:center;">\n      Aradığınız içerik bulunamamaktadır.</p>\n  <ion-infinite-scroll style="height:1vh;" (ionInfinite)="doInfinite($event)" *ngIf="!noRecord">\n    <ion-infinite-scroll-content loadingSpinner="crescent" loadingText="Yükleniyor...">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\muzik-ara\muzik-ara.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */]])
    ], MuzikAraPage);
    return MuzikAraPage;
}());

//# sourceMappingURL=muzik-ara.js.map

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SifremiUnuttumPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




/**
 * Generated class for the SifremiUnuttumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SifremiUnuttumPage = /** @class */ (function () {
    function SifremiUnuttumPage(navCtrl, navParams, loadingController, toastController, alertCtrl, authService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingController = loadingController;
        this.toastController = toastController;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.bilgi = { "mail": this.mail };
    }
    SifremiUnuttumPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SifremiUnuttumPage');
    };
    SifremiUnuttumPage.prototype.don = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
    };
    SifremiUnuttumPage.prototype.su = function () {
        var _this = this;
        var loader = this.loadingController.create({
            content: "Lütfen Bekleyiniz."
        });
        loader.present();
        if (this.bilgi.mail) {
            this.authService.postData(this.bilgi, "sifremi_unuttum.php").then(function (result) {
                _this.resposeData = JSON.stringify(result);
                _this.tumBilgiler = JSON.parse(_this.resposeData);
                console.log(_this.tumBilgiler);
                if (_this.tumBilgiler["hata"] == "0") {
                    _this.hata0();
                    loader.dismiss();
                }
                else if (_this.tumBilgiler["hata"] == "1") {
                    _this.hata1();
                    loader.dismiss();
                }
            }, function (err) {
                loader.dismiss();
                _this.showalertinfo();
                //Connection failed message
            });
        }
        else {
            //this.presentToast("Give username and password");
            loader.dismiss();
            this.showalertinfo();
        }
    };
    SifremiUnuttumPage.prototype.hata0 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Şifre yenileme linkiniz e-posta adresinize gönderilmiştir.',
                            duration: 4000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    SifremiUnuttumPage.prototype.hata1 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Mail adresiniz bulunamadı.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    SifremiUnuttumPage.prototype.showalertinfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Kullanıcı Bilgileriniz yanlış.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    SifremiUnuttumPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-sifremi-unuttum',template:/*ion-inline-start:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\sifremi-unuttum\sifremi-unuttum.html"*/'<ion-header>\n\n  <ion-navbar color="dark" hideBackButton *navbar hideMenuToggle>\n    <ion-title center>Şifremi Unuttum</ion-title>\n  </ion-navbar>\n\n</ion-header>\n<div class="login-container">\n    <div class="limiter">\n      <div class="container-login100">\n        <div class="wrap-login100">\n          <div class="wrap-input100 validate-input">\n            <input class="input100" placeholder="Mail Adresinizi Giriniz " type="username" [(ngModel)]="bilgi.mail">\n            <span class="focus-input100"></span>\n            <span class="symbol-input100">\n              <ion-icon name="ios-mail"></ion-icon>\n            </span>\n          </div>\n          <div class="container-login100-form-btn">\n            <button class="login100-form-btn" (click)="su()">\n              <ion-icon name="md-log-in"></ion-icon>&nbsp;\n              Aktivasyon Maili Gönder\n            </button>\n          </div>\n          <div class="container-login100-form-btn">\n            <button class="login100-form-btn" (click)="don()">\n              <ion-icon name="md-log-in"></ion-icon>&nbsp;\n              Giriş Sayfasına Dön\n            </button>\n          </div>'/*ion-inline-end:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\sifremi-unuttum\sifremi-unuttum.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]])
    ], SifremiUnuttumPage);
    return SifremiUnuttumPage;
}());

//# sourceMappingURL=sifremi-unuttum.js.map

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HakkindaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the HakkindaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HakkindaPage = /** @class */ (function () {
    function HakkindaPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    HakkindaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HakkindaPage');
    };
    HakkindaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-hakkinda',template:/*ion-inline-start:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\hakkinda\hakkinda.html"*/'<!--\n  Generated template for the HakkindaPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n</ion-header>\n\n\n    <div class="waveWrapper waveAnimation">\n        <div class="waveWrapperInner bgTop">\n            <img  src="assets/imgs/slogo.png" style="margin-left:10%; margin-top:40%;" alt="IMG" width="290px;" height="130px;">\n            <div style="margin-left:10%;">\n              <strong><p class="first">Emeği Geçenler : <span class="emphasis">M.Ali Ergüç & İlkcan Doğan</span></p></strong>\n            </div>\n          <div class="wave waveTop" style="background-image: url(\'assets/imgs/wave.png\')"></div>\n        </div>\n        <div class="waveWrapperInner bgMiddle">\n          <div class="wave waveMiddle" style="background-image: url(\'assets/imgs/wave.png\')"></div>\n        </div>\n        <div class="waveWrapperInner bgBottom">\n          <div class="wave waveBottom" style="background-image: url(\'assets/imgs/wave.png\')"></div>\n        </div>\n      </div>\n\n'/*ion-inline-end:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\hakkinda\hakkinda.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], HakkindaPage);
    return HakkindaPage;
}());

//# sourceMappingURL=hakkinda.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SssPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the SssPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SssPage = /** @class */ (function () {
    function SssPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.lottieConfig = {
            path: 'assets/imgs/sssanimation.json',
            renderer: 'canvas',
            autoplay: true,
            loop: true
        };
    }
    SssPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SssPage');
    };
    SssPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-sss',template:/*ion-inline-start:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\sss\sss.html"*/'<ion-header>\n\n    <ion-navbar color="dark">\n        <button ion-button menuToggle style="margin-top:6%;">\n          <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title style="margin-top:6%;">Sıkça Sorulan Sorular</ion-title>\n      </ion-navbar>\n  \n  </ion-header>\n  \n  \n  <ion-content padding>\n    <div class="row">\n      <div class="col">\n        <div class="tabs">\n          <div class="tab">\n            <input type="checkbox" id="chck1">\n            <label class="tab-label" for="chck1">Singraf Nedir ?</label>\n            <div class="tab-content">\n              Singraf, müziğe gönül vermiş, hem dinleyici hemde üretici olan kişileri aynı çatı altında toplamayı amaçlayan,\n              eğlenceli içerikleriyle kullanıcılarına keyifli vakitler geçirmeyi vadeden uygulamadır.Kendi içeriklerinizi üretebilir,\n              üretilen içerikleri dinleyip yorum yapabilir, her hafta düzenlenen yarışmalara katılabilir, müzik alanında farkınızı ortaya\n              koyabilirsiniz.Beğendiğiniz kullanıcılarla sohbet edebilirsiniz, bu kişilerle iletişime geçip bu alandaki yetenekli kişilerle\n              tanışabilirsiniz.\n            </div>\n          </div>\n          <div class="tab">\n            <input type="checkbox" id="chck2">\n            <label class="tab-label" for="chck2">Coinler ile ne yapabilirim ?</label>\n            <div class="tab-content">\n              Şuanda coin ile kullanıcı adınızı değiştirebilirisiniz,ama coinlerinizi saklayın, gelecekteki yenilikler için birikim yapın.Coin kazanmak için\n              sağ üst köşedeki turuncu havuca tıklayarak reklam izleyin ve her izleme başına 2 coin kazanın.Günlük reklam izleme sınırı 48\'dir.Coinlerinizi \n              gelecek yeniliklere kadar saklayın.\n            </div>\n          </div>\n          <div class="tab">\n            <input type="checkbox" id="chck3">\n            <label class="tab-label" for="chck3">Kurallar</label>\n            <div class="tab-content">\n              ♫ Kazanç elde etmek amaçlı kısaltılmış linklerin kullanılması yasaktır.\n              <br>\n              <br>\n              ♫ küfür, argo, hakaret, küçük düşürücü, aşağılayıcı, \n              rencide edici tüm kelimelerin; din, dil, ırk ayrımına yönelik veya uygulama huzurunu kaçıracak \n              her türlü söylev, yazı, resim, video ve diğer tüm materyallerin kullanımı yasaktır.\n              <br>\n              <br>\n              ♫ Özel mesaj yoluyla üyeleri rahatsız etmek veya taciz edici mesajlar yollamak yasaktır.\n              <br>\n              <br>\n              ♫ Uygulamayı reklam aracı olarak kullanmak yasaktır.\n              <br>\n              <br>\n              ♫ Uygulamayı reklam aracı olarak kullanmak yasaktır.\n              <br>\n              <br>\n              ♫ Uygulamada pornografik içeriklerin yayınlanması yasaktır.\n              <br>\n              <br>\n              ♫ Kullanıcıların birden fazla hesap açması yasaktır.\n              <br>\n              <br>\n              ♫ Hesap güvenliği ile ilgili her kullanıcının kendi hesabından sorumludur.\n              <br>\n              <br>\n              ♫ Küfür, slogan, pornografik içerik veya parti logosu içeren avatar kullanmak yasaktır.\n\n            </div>\n          </div>\n          <div class="tab">\n            <input type="checkbox" id="chck4">\n            <label class="tab-label" for="chck4">İçerik Yüklemeleri Hakkında</label>\n            <div class="tab-content">\n             Yükleyeceğiniz içeriklerin süresi 90 saniyedir, kullanıcı yüklediği içeriğin beğeni sayısı kadar haftanın birincileri\n             kategorisinde değerlendirilir ve birincilik seçimi beğeni sayısına göre yapılır.Haftanın birincilerine özel hediyemiz\n             birincilik coinidir.\n            </div>\n          </div>\n          <div class="tab">\n            <input type="checkbox" id="chck5">\n            <label class="tab-label" for="chck5">Kullanıcı şikayeti ve geri bildirim</label>\n            <div class="tab-content">\n             şikayet istek ve önerileriniz için instagram,google ve facebook adreslerimizden bizlere uluaşabilirsiniz.\n            </div>\n          </div>\n        </div>\n        \n\n     </div>\n     </div>\n     <lottie-animation-view\n  [options]="lottieConfig"\n  [width]="300"\n  [height]="300"\n  >\n</lottie-animation-view>\n  </ion-content>'/*ion-inline-end:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\sss\sss.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], SssPage);
    return SssPage;
}());

//# sourceMappingURL=sss.js.map

/***/ }),

/***/ 209:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 209;

/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/bio-duzenle/bio-duzenle.module": [
		800,
		26
	],
	"../pages/chat-room/chat-room.module": [
		776,
		25
	],
	"../pages/chat/chat.module": [
		777,
		24
	],
	"../pages/cikis/cikis.module": [
		778,
		23
	],
	"../pages/full-screen/full-screen.module": [
		779,
		22
	],
	"../pages/habericerik/habericerik.module": [
		781,
		21
	],
	"../pages/haberler/haberler.module": [
		780,
		20
	],
	"../pages/haftanin-birincileri/haftanin-birincileri.module": [
		782,
		19
	],
	"../pages/hakkinda/hakkinda.module": [
		783,
		18
	],
	"../pages/kategoriiceril/kategoriiceril.module": [
		786,
		17
	],
	"../pages/kategoriler/kategoriler.module": [
		784,
		16
	],
	"../pages/kayit-ol/kayit-ol.module": [
		785,
		15
	],
	"../pages/likelist/likelist.module": [
		787,
		14
	],
	"../pages/login/login.module": [
		788,
		13
	],
	"../pages/mp-comment/mp-comment.module": [
		789,
		12
	],
	"../pages/muzik-ara/muzik-ara.module": [
		790,
		11
	],
	"../pages/p-resim-yukle/p-resim-yukle.module": [
		793,
		10
	],
	"../pages/popover/popover.module": [
		792,
		9
	],
	"../pages/popup-modal/popup-modal.module": [
		791,
		8
	],
	"../pages/presimonizle/presimonizle.module": [
		794,
		7
	],
	"../pages/profil/profil.module": [
		801,
		6
	],
	"../pages/reklam/reklam.module": [
		795,
		5
	],
	"../pages/sifremi-unuttum/sifremi-unuttum.module": [
		796,
		4
	],
	"../pages/sss/sss.module": [
		797,
		3
	],
	"../pages/video-yukle/video-yukle.module": [
		798,
		2
	],
	"../pages/video-yukleicerik/video-yukleicerik.module": [
		802,
		1
	],
	"../pages/yorumlar/yorumlar.module": [
		799,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 254;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chat_chat__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__full_screen_full_screen__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__presimonizle_presimonizle__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_in_app_browser__ = __webpack_require__(274);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var PopoverPage = /** @class */ (function () {
    function PopoverPage(navCtrl, navParams, http, modalCtrl, iab) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.modalCtrl = modalCtrl;
        this.iab = iab;
        this.options = {
            location: 'yes',
            hidden: 'no',
            clearcache: 'yes',
            clearsessioncache: 'yes',
            zoom: 'yes',
            hardwareback: 'yes',
            mediaPlaybackRequiresUserAction: 'no',
            shouldPauseOnSuspend: 'no',
            closebuttoncaption: 'Close',
            disallowoverscroll: 'no',
            toolbar: 'yes',
            enableViewportScale: 'no',
            allowInlineMediaPlayback: 'no',
            presentationstyle: 'pagesheet',
            fullscreen: 'yes',
        };
        this.diger = window.localStorage.getItem('f_name');
        this.socialinsta = false;
        this.socialface = false;
        this.socialtwit = false;
        this.record = false;
        this.idP = navParams.get('idP');
        this.nname = navParams.get('Nickname');
        this.image = navParams.get('image');
        this.lottieConfig3 = {
            path: 'assets/imgs/notfound.json',
            renderer: 'canvas',
            autoplay: true,
            loop: true
        };
        this.baslangic(this.idP);
    }
    PopoverPage.prototype.ionViewDidLoad = function () {
    };
    PopoverPage.prototype.instagram = function (url) {
        var endPoint = this.uBilgiler[0].INSTAGRAM;
        var startPoint = url + endPoint;
        var target = "_self";
        this.iab.create(startPoint, target, this.options);
    };
    PopoverPage.prototype.facebook = function (url) {
        var endPoint = this.uBilgiler[0].FACEBOOK;
        var startPoint = url + endPoint;
        var target = "_self";
        this.iab.create(startPoint, target, this.options);
    };
    PopoverPage.prototype.twitter = function (url) {
        var endPoint = this.uBilgiler[0].TWITTER;
        var startPoint = url + endPoint;
        var target = "_self";
        this.iab.create(startPoint, target, this.options);
    };
    PopoverPage.prototype.presimizle = function (event1) {
        this.openModal(__WEBPACK_IMPORTED_MODULE_5__presimonizle_presimonizle__["a" /* PresimonizlePage */], {
            resim: event1
        });
    };
    PopoverPage.prototype.openModal = function (pageName, event1) {
        this.modalCtrl.create(pageName, event1, { cssClass: 'inset-modal' })
            .present();
    };
    PopoverPage.prototype.fimage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__full_screen_full_screen__["a" /* FullScreenPage */]);
    };
    PopoverPage.prototype.mesajG = function (user_img) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__chat_chat__["a" /* ChatPage */], {
            nickname: this.nname,
            u_id: this.idP,
            u_img: this.image
        });
    };
    PopoverPage.prototype.baslangic = function (idP) {
        var _this = this;
        var baseURL = 'https://ilkcandogan.com/video_profil.php?id=';
        this.http.get(baseURL + idP)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res);
            _this.uBilgiler = res.profil;
            _this.bottomData = res.video;
            if (_this.uBilgiler[0].INSTAGRAM == null) {
                _this.socialinsta = true;
            }
            if (_this.uBilgiler[0].FACEBOOK == null) {
                _this.socialface = true;
            }
            if (_this.uBilgiler[0].TWITTER == null) {
                _this.socialtwit = true;
            }
            if (_this.bottomData == 0) {
                _this.record = true;
            }
            console.log(_this.uBilgiler);
        }, function (err) {
        });
    };
    PopoverPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-popover',template:/*ion-inline-start:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\popover\popover.html"*/'<ion-header>\n  <ion-navbar color="dark">\n    <button ion-button menuToggle style="margin-top:6%;">\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title center style="margin-top:6%;">{{nname}} </ion-title>\n  </ion-navbar>\n</ion-header>\n\n  <ion-spinner name="crescent" *ngIf="!uBilgiler" color="dark"></ion-spinner>\n  <ion-content *ngFor="let user of uBilgiler">\n     \n    <div id="profile-bg"></div>\n   \n    <div id="content">\n        <ion-fab right top>\n            <button ion-fab fab-mini-size color="dark">\n              <ion-icon name="ios-chatbubbles"></ion-icon>\n            </button>\n            <ion-fab-list side="bottom">\n              <button ion-fab (click)="instagram(\'https://www.instagram.com/\')" *ngIf="!socialinsta">\n                <ion-icon name="logo-instagram" color="instagram"></ion-icon>\n              </button>\n              <button ion-fab (click)="facebook(\'https://tr-tr.facebook.com/\')" *ngIf="!socialface">\n                <ion-icon name="logo-facebook" color="facebook"></ion-icon>\n              </button>\n              <button ion-fab (click)="twitter(\'https://twitter.com/\')" *ngIf="!socialtwit">\n                <ion-icon name="logo-twitter" color="twitter"></ion-icon>\n              </button>\n            </ion-fab-list>\n          </ion-fab>\n      <!--\n        <ion-fab right top *ngIf="user.F_NAME != diger">\n            <button ion-fab  fab-mini-size color="dark" (click)="mesajG()"><ion-icon name="ios-mail"></ion-icon></button>      \n        </ion-fab>\n      -->\n        <div id="profile-info">\n\n          <img id="profile-image" src="{{user.IMAGE}}" (click)="presimizle(user.IMAGE)">\n    \n    \n          <h3 id="profile-name">{{user.N_NAME}}</h3>\n          <span id="profile-description">@{{user.F_NAME2}}_{{user.L_NAME2}}</span>\n    \n          <p></p>\n          <ion-icon name="md-rose" color="dark"></ion-icon> <span\n          id="profile-description"><strong>Doğum Tarihi : {{user.B_DATE}}</strong></span>\n    \n        <br>\n        <br>\n          <ion-icon name="ios-heart" color="dark"></ion-icon> <span\n            id="profile-description"><strong>Toplam Beğeni : {{user.SCORE}}</strong></span>\n    \n          <br>\n          <br>\n    \n           <ion-icon name="pin" color="dark"></ion-icon> <span\n            id="profile-description"><strong>Şehir : {{user.CITY}}</strong></span>\n    \n          <br>\n          \n        </div>\n    \n            </div>\n            <ion-card style="margin-top: 15px;">\n              <div style="padding-left:7px; padding-right:7px;margin-top: 15px;">\n                <div>\n                  <h1 style="text-align:center;">Biyografi</h1>\n                  <br>\n                  <p style="text-align:center; padding-left:4%; padding-right:4%;">{{user.BIO}}</p>\n                </div>\n              </div>\n              <br>\n            </ion-card>\n            <button ion-button full color="dark" *ngIf="user.USER_ID == diger" (click)="mesajG(user.IMAGE)">Mesaj Gönder</button>\n            <ion-title color="dark">\n              <p style="text-align:center; color: #ce0e0e;">Yüklenen Videolar</p>\n            </ion-title>\n            <div class="canvasi" *ngIf="record">\n              <lottie-animation-view *ngIf="record" [options]="lottieConfig3" [width]="300" [height]="400">\n              </lottie-animation-view>\n            </div>\n            <p *ngIf="record" style="font-size: 16px; color:#ce0e0e; width:100%; text-align:center;">Kullanıcının içeriği bulunamamaktadır</p>\n            <autoplay-content>\n            <ion-card *ngFor="let user of bottomData">\n  \n        <ion-item>\n          <br>\n          <h2 (click)="presentPopover(user.USER_ID)">{{user.N_NAME}}</h2>\n          <p><span>Söz Müzik :</span> <b><span>{{user.MELODY_NAME_SURNAME}}</span></b></p>\n          <br>\n          <p><span>Şarkı Adı :</span> <b><span>{{user.MUSIC_NAME}}</span></b></p>\n          <br>\n          <p><span>Tür :</span> <b><span>{{user.CATEGORY_NAME}}</span></b></p>\n        </ion-item>\n        <div>\n          <video width="900" height="180" poster="{{user.THUMB}}">\n            <source src="{{user.VIDEO}}" type="video/mp4">\n            Videonuz Yüklenemiyor\n          </video>\n        </div>\n        <ion-card-content>\n          <p><b><span>Yüklenme Tarihi : </span></b> <span>{{user.UPLOAD_DATE}}</span></p>\n          <br>\n          <p><b><span>Beğeni Sayısı : </span></b> <span>{{user.LIKES}}</span></p>\n          <br>\n  \n        </ion-card-content>\n  \n      </ion-card>\n      <br>\n      <br>\n      <br>\n    </autoplay-content>\n  </ion-content>'/*ion-inline-end:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\popover\popover.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
    ], PopoverPage);
    return PopoverPage;
}());

//# sourceMappingURL=popover.js.map

/***/ }),

/***/ 414:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AutoplayVideoDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AutoplayVideoDirective = /** @class */ (function () {
    function AutoplayVideoDirective() {
    }
    AutoplayVideoDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'video'
        })
    ], AutoplayVideoDirective);
    return AutoplayVideoDirective;
}());

//# sourceMappingURL=autoplay-video.js.map

/***/ }),

/***/ 415:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PResimYuklePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the PResimYuklePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PResimYuklePage = /** @class */ (function () {
    function PResimYuklePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    PResimYuklePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PResimYuklePage');
    };
    PResimYuklePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-p-resim-yukle',template:/*ion-inline-start:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\p-resim-yukle\p-resim-yukle.html"*/'<!--\n  Generated template for the PResimYuklePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>pResimYukle</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\p-resim-yukle\p-resim-yukle.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], PResimYuklePage);
    return PResimYuklePage;
}());

//# sourceMappingURL=p-resim-yukle.js.map

/***/ }),

/***/ 416:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(421);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 421:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_media_capture__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_media__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_sqlite__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_file_transfer__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ng_socket_io__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_storage__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_admob_free__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_device__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_network__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_native_audio__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ng_lottie__ = __webpack_require__(767);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_native_page_transitions__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_local_notifications__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_angular_progress_bar__ = __webpack_require__(771);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_ionic_progress_bar__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_components_module__ = __webpack_require__(772);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_in_app_browser__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__directives_directives_module__ = __webpack_require__(774);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_mp_comment_mp_comment__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_cikis_cikis__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_muzik_ara_muzik_ara__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_bio_duzenle_bio_duzenle__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_video_yukleicerik_video_yukleicerik__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_habericerik_habericerik__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_haberler_haberler__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_haftanin_birincileri_haftanin_birincileri__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_hakkinda_hakkinda__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_kategoriler_kategoriler__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_popup_modal_popup_modal__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_login_login__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_presimonizle_presimonizle__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_p_resim_yukle_p_resim_yukle__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_profil_profil__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_reklam_reklam__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__pages_full_screen_full_screen__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pages_likelist_likelist__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_sifremi_unuttum_sifremi_unuttum__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__pages_chat_chat__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__pages_sss_sss__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__pages_video_yukle_video_yukle__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__pages_yorumlar_yorumlar__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__pages_home_home__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__pages_chat_room_chat_room__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__pages_kayit_ol_kayit_ol__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__pages_popover_popover__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__pages_kategoriiceril_kategoriiceril__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__app_component__ = __webpack_require__(775);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__providers_auth_service_auth_service__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__providers_veritabani_veritabani__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


























//#region Sayfalar




























//#endregion



var config = { url: 'http://165.22.77.175:3001', options: {} };
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_54__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_49__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_bio_duzenle_bio_duzenle__["a" /* BioDuzenlePage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_habericerik_habericerik__["a" /* HabericerikPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_haberler_haberler__["a" /* HaberlerPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_cikis_cikis__["a" /* CikisPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_popup_modal_popup_modal__["a" /* PopupModalPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_haftanin_birincileri_haftanin_birincileri__["a" /* HaftaninBirincileriPage */],
                __WEBPACK_IMPORTED_MODULE_53__pages_kategoriiceril_kategoriiceril__["a" /* KategoriicerilPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_hakkinda_hakkinda__["a" /* HakkindaPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_full_screen_full_screen__["a" /* FullScreenPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_kategoriler_kategoriler__["a" /* KategorilerPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_video_yukleicerik_video_yukleicerik__["a" /* VideoYukleicerikPage */],
                __WEBPACK_IMPORTED_MODULE_52__pages_popover_popover__["a" /* PopoverPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_mp_comment_mp_comment__["a" /* MpCommentPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_51__pages_kayit_ol_kayit_ol__["a" /* KayitOlPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_presimonizle_presimonizle__["a" /* PresimonizlePage */],
                __WEBPACK_IMPORTED_MODULE_50__pages_chat_room_chat_room__["a" /* ChatRoomPage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_p_resim_yukle_p_resim_yukle__["a" /* PResimYuklePage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_likelist_likelist__["a" /* LikelistPage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_profil_profil__["a" /* ProfilPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_muzik_ara_muzik_ara__["a" /* MuzikAraPage */],
                __WEBPACK_IMPORTED_MODULE_41__pages_reklam_reklam__["a" /* ReklamPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_sifremi_unuttum_sifremi_unuttum__["a" /* SifremiUnuttumPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_sss_sss__["a" /* SssPage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_video_yukle_video_yukle__["a" /* VideoYuklePage */],
                __WEBPACK_IMPORTED_MODULE_48__pages_yorumlar_yorumlar__["a" /* YorumlarPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_54__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/chat-room/chat-room.module#ChatRoomPageModule', name: 'ChatRoomPage', segment: 'chat-room', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/chat/chat.module#ChatPageModule', name: 'ChatPage', segment: 'chat', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/cikis/cikis.module#CikisPageModule', name: 'CikisPage', segment: 'cikis', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/full-screen/full-screen.module#FullScreenPageModule', name: 'FullScreenPage', segment: 'full-screen', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/haberler/haberler.module#HaberlerPageModule', name: 'HaberlerPage', segment: 'haberler', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/habericerik/habericerik.module#HabericerikPageModule', name: 'HabericerikPage', segment: 'habericerik', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/haftanin-birincileri/haftanin-birincileri.module#HaftaninBirincileriPageModule', name: 'HaftaninBirincileriPage', segment: 'haftanin-birincileri', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/hakkinda/hakkinda.module#HakkindaPageModule', name: 'HakkindaPage', segment: 'hakkinda', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/kategoriler/kategoriler.module#KategorilerPageModule', name: 'KategorilerPage', segment: 'kategoriler', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/kayit-ol/kayit-ol.module#KayitOlPageModule', name: 'KayitOlPage', segment: 'kayit-ol', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/kategoriiceril/kategoriiceril.module#KategoriicerilPageModule', name: 'KategoriicerilPage', segment: 'kategoriiceril', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/likelist/likelist.module#LikelistPageModule', name: 'LikelistPage', segment: 'likelist', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/mp-comment/mp-comment.module#MpCommentPageModule', name: 'MpCommentPage', segment: 'mp-comment', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/muzik-ara/muzik-ara.module#MuzikAraPageModule', name: 'MuzikAraPage', segment: 'muzik-ara', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/popup-modal/popup-modal.module#PopupModalPageModule', name: 'PopupModalPage', segment: 'popup-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/popover/popover.module#PopoverPageModule', name: 'PopoverPage', segment: 'popover', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/p-resim-yukle/p-resim-yukle.module#PResimYuklePageModule', name: 'PResimYuklePage', segment: 'p-resim-yukle', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/presimonizle/presimonizle.module#PresimonizlePageModule', name: 'PresimonizlePage', segment: 'presimonizle', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/reklam/reklam.module#ReklamPageModule', name: 'ReklamPage', segment: 'reklam', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/sifremi-unuttum/sifremi-unuttum.module#SifremiUnuttumPageModule', name: 'SifremiUnuttumPage', segment: 'sifremi-unuttum', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/sss/sss.module#SssPageModule', name: 'SssPage', segment: 'sss', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/video-yukle/video-yukle.module#VideoYuklePageModule', name: 'VideoYuklePage', segment: 'video-yukle', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/yorumlar/yorumlar.module#YorumlarPageModule', name: 'YorumlarPage', segment: 'yorumlar', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/bio-duzenle/bio-duzenle.module#BioDuzenlePageModule', name: 'BioDuzenlePage', segment: 'bio-duzenle', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/profil/profil.module#ProfilPageModule', name: 'ProfilPage', segment: 'profil', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/video-yukleicerik/video-yukleicerik.module#VideoYukleicerikPageModule', name: 'VideoYukleicerikPage', segment: 'video-yukleicerik', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_22_ionic_progress_bar__["a" /* IonicSimpleProgressBarModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_12__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_11_ng_socket_io__["SocketIoModule"].forRoot(config),
                __WEBPACK_IMPORTED_MODULE_13__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_23__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_25__directives_directives_module__["a" /* DirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_21_angular_progress_bar__["a" /* ProgressBarModule */],
                __WEBPACK_IMPORTED_MODULE_18_ng_lottie__["a" /* LottieAnimationViewModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_54__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_49__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_bio_duzenle_bio_duzenle__["a" /* BioDuzenlePage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_mp_comment_mp_comment__["a" /* MpCommentPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_cikis_cikis__["a" /* CikisPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_habericerik_habericerik__["a" /* HabericerikPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_full_screen_full_screen__["a" /* FullScreenPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_haberler_haberler__["a" /* HaberlerPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_presimonizle_presimonizle__["a" /* PresimonizlePage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_popup_modal_popup_modal__["a" /* PopupModalPage */],
                __WEBPACK_IMPORTED_MODULE_50__pages_chat_room_chat_room__["a" /* ChatRoomPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_haftanin_birincileri_haftanin_birincileri__["a" /* HaftaninBirincileriPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_hakkinda_hakkinda__["a" /* HakkindaPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_likelist_likelist__["a" /* LikelistPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_video_yukleicerik_video_yukleicerik__["a" /* VideoYukleicerikPage */],
                __WEBPACK_IMPORTED_MODULE_51__pages_kayit_ol_kayit_ol__["a" /* KayitOlPage */],
                __WEBPACK_IMPORTED_MODULE_53__pages_kategoriiceril_kategoriiceril__["a" /* KategoriicerilPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_kategoriler_kategoriler__["a" /* KategorilerPage */],
                __WEBPACK_IMPORTED_MODULE_52__pages_popover_popover__["a" /* PopoverPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_muzik_ara_muzik_ara__["a" /* MuzikAraPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_p_resim_yukle_p_resim_yukle__["a" /* PResimYuklePage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_profil_profil__["a" /* ProfilPage */],
                __WEBPACK_IMPORTED_MODULE_41__pages_reklam_reklam__["a" /* ReklamPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_sifremi_unuttum_sifremi_unuttum__["a" /* SifremiUnuttumPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_sss_sss__["a" /* SssPage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_video_yukle_video_yukle__["a" /* VideoYuklePage */],
                __WEBPACK_IMPORTED_MODULE_48__pages_yorumlar_yorumlar__["a" /* YorumlarPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_media_capture__["a" /* MediaCapture */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_media__["a" /* Media */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_22_ionic_progress_bar__["b" /* SimpleProgressBarProvider */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_device__["a" /* Device */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_native_audio__["a" /* NativeAudio */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_local_notifications__["a" /* LocalNotifications */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_native_page_transitions__["a" /* NativePageTransitions */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_file_transfer__["b" /* FileTransferObject */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_admob_free__["a" /* AdMobFree */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_55__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_sqlite__["a" /* SQLite */],
                __WEBPACK_IMPORTED_MODULE_56__providers_veritabani_veritabani__["a" /* VeritabaniProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 465:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__kayit_ol_kayit_ol__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sifremi_unuttum_sifremi_unuttum__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_auth_service_auth_service__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_device__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__ = __webpack_require__(100);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};










var LoginPage = /** @class */ (function () {
    function LoginPage(LoadingLogin, loginmenu, navCtrl, navParams, http, _platform, options, alertCtrl, authService, loadingCtrl, toastController, Device, statusbar) {
        this.LoadingLogin = LoadingLogin;
        this.loginmenu = loginmenu;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this._platform = _platform;
        this.options = options;
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        this.toastController = toastController;
        this.Device = Device;
        this.statusbar = statusbar;
        this.anaUrl = "https://ilkcandogan.com";
        this.mac = '112233445566';
        /*bilgi = {
          "mail": this.mail, "pass": this.pass,"uuid":this.Device.uuid };*/
        this.bilgi = {
            "mail": this.mail, "pass": this.pass, "uuid": "12345678912345678"
        };
        this.statusbar.overlaysWebView(false);
        this.statusbar.backgroundColorByHexString('#ce0e0e');
        this.loginhidden();
        /*if (window.localStorage.getItem('token') != null) {
    
          this.navCtrl.push(HomePage);
    
    
        }
        else if (window.localStorage.getItem('token')) {
    
    
          this.navCtrl.push(LoginPage);
          this.navCtrl.setRoot(HomePage);
       
        }*/
    }
    LoginPage.prototype.loginhidden = function () {
        this.loginmenu.enable(false);
    };
    LoginPage.prototype.kayitol = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__kayit_ol_kayit_ol__["a" /* KayitOlPage */]);
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.sifremiunuttump = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__sifremi_unuttum_sifremi_unuttum__["a" /* SifremiUnuttumPage */]);
    };
    LoginPage.prototype.sil = function () {
        window.localStorage.removeItem('token');
        return true;
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Giriş Yapılıyor"
        });
        loader.present();
        if (this.bilgi.mail && this.bilgi.pass && this.bilgi.mail.length > 1 && this.bilgi.pass.length > 1
            && this.bilgi.uuid != null) {
            this.teleUuid = this.Device.uuid;
            this.authService.postData(this.bilgi, "giris.php").then(function (result) {
                _this.resposeData = JSON.stringify(result);
                _this.tumBilgiler = JSON.parse(_this.resposeData);
                console.log(_this.tumBilgiler);
                window.localStorage.setItem('token', _this.tumBilgiler["TOKEN"]);
                window.localStorage.setItem('idf', _this.tumBilgiler["ID"]);
                window.localStorage.setItem('n_name', _this.tumBilgiler["N_NAME"]);
                window.localStorage.setItem('f_name', _this.tumBilgiler["F_NAME"]);
                window.localStorage.setItem('l_name', _this.tumBilgiler["L_NAME"]);
                window.localStorage.setItem('city', _this.tumBilgiler["CITY"]);
                window.localStorage.setItem('b_date', _this.tumBilgiler["B_DATE"]);
                window.localStorage.setItem('skor', _this.tumBilgiler["SCORE"]);
                window.localStorage.setItem('bio', _this.tumBilgiler["BIO"]);
                window.localStorage.setItem('coin', _this.tumBilgiler["COIN"]);
                window.localStorage.setItem('image', _this.tumBilgiler["IMAGE"]);
                window.localStorage.setItem('reg_frame_id', _this.tumBilgiler["REG_FRAME_ID"]);
                if (_this.tumBilgiler["hata"] == "0") {
                    if (_this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */])) {
                        loader.dismiss();
                    }
                }
                else if (_this.tumBilgiler["hata"] == "3") {
                    _this.hata3();
                    loader.dismiss();
                }
                else if (_this.tumBilgiler["hata"] == "1" || _this.tumBilgiler["hata"] == "2") {
                    _this.hata6();
                    loader.dismiss();
                }
                else if (_this.tumBilgiler["hata"] == "4") {
                    _this.hata4();
                    loader.dismiss();
                }
                else if (_this.tumBilgiler["hata"] == "5") {
                    _this.hata5();
                    loader.dismiss();
                }
            }, function (err) {
                loader.dismiss();
                _this.showalertinfo();
                //Connection failed message
            });
        }
        else {
            //this.presentToast("Give username and password");
            loader.dismiss();
            this.showalertinfo();
        }
    };
    LoginPage.prototype.hata6 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Kullanıcı Bilgileriniz yanlış.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.showalertinfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Kullanıcı Bilgileriniz yanlış.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.hata3 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Hesabınız Engellenmiştir.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.hata4 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Hesap Aktif değil.Lütfen mail adresinize gelen aktivasyon kodunu etkinleştirin.',
                            duration: 4000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.hata5 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Hesap Başka Cihazda aktif.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.exit = function () {
        this._platform.exitApp();
    };
    LoginPage.prototype.onregister = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__kayit_ol_kayit_ol__["a" /* KayitOlPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\login\login.html"*/'\n<div class="login-container">\n  <div class="limiter">\n    <div class="container-login100">\n      <div class="wrap-login100">\n        \n        <form class="login100-form validate-form">\n          <span class="login100-form-title">\n              <img  src="assets/imgs/slogo.png" alt="IMG" width="290px;" height="130px;">\n          </span>\n\n          <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">\n            <input class="input100" type="text" name="email" placeholder="E-mail Adresiniz" [(ngModel)]="bilgi.mail">\n            <span class="focus-input100"></span>\n            <span class="symbol-input100">\n                <ion-icon name="ios-mail"></ion-icon>\n            </span>\n          </div>\n\n          <div class="wrap-input100 validate-input" data-validate = "Password is required">\n            <input class="input100" type="password" name="pass" placeholder="Şifreniz" [(ngModel)]="bilgi.pass">\n            <span class="focus-input100"></span>\n            <span class="symbol-input100">\n                <ion-icon name="md-unlock"></ion-icon>\n            </span>\n          </div>\n          \n          <div class="container-login100-form-btn" style="width:100%;">\n            <button class="login100-form-btn" (click)="login()">\n                <ion-icon name="md-log-in"></ion-icon>&nbsp;\n                Giriş Yap \n            </button>\n          </div>\n\n          <div class="container-login100-form-btn">\n            <button class="login100-form-btn" (click)="kayitol()">  \n                <ion-icon name="md-musical-notes"></ion-icon>&nbsp;\n                Kayıt Ol     \n            </button>\n          </div>\n          <h6 (click)="sifremiunuttump()" style="text-align:center; margin-top: 4px;"><ion-icon name="ios-help-buoy" color="secondary">&nbsp;</ion-icon><u>Şifremi Unuttum</u></h6>\n          \n        </form>\n      </div>\n    </div>\n</div>\n\n\n  <!--\n  <div class="login-container">\n    <div class="limiter">\n      <div class="container-login100">\n        <div class="wrap-login100">\n          \n          <form class="login100-form validate-form">\n            <span class="login100-form-title">\n                <img style="border-radius: 50%; border: 2px;" src="../assets/imgs/Music_by_LittleGirl88.jpg" alt="IMG" width="150px;" height="150px;">\n            </span>\n  \n            <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">\n              <input class="input100" type="text" name="email" placeholder="E-mail Adresiniz" [(ngModel)]="bilgi.mail">\n              <span class="focus-input100"></span>\n              <span class="symbol-input100">\n                  <ion-icon name="ios-mail"></ion-icon>\n              </span>\n            </div>\n  \n            <div class="wrap-input100 validate-input" data-validate = "Password is required">\n              <input class="input100" type="password" name="pass" placeholder="Şifreniz" [(ngModel)]="bilgi.pass">\n              <span class="focus-input100"></span>\n              <span class="symbol-input100">\n                  <ion-icon name="md-unlock"></ion-icon>\n              </span>\n            </div>\n            \n            <div class="container-login100-form-btn" style="width:100%;">\n              <button class="login100-form-btn" (click)="login()">\n                  <ion-icon name="md-log-in"></ion-icon>&nbsp;\n                  Giriş Yap \n              </button>\n            </div>\n\n            <div class="container-login100-form-btn">\n              <button class="login100-form-btn" (click)="kayitol()">  \n                  <ion-icon name="md-musical-notes"></ion-icon>&nbsp;\n                  Kayıt Ol     \n              </button>\n            </div>\n            <h6 (click)="sifremiunuttump()"><ion-icon name="ios-help-buoy">&nbsp;</ion-icon><u>Şifremi Unuttum</u></h6>\n            \n          </form>\n        </div>\n      </div>\n</div>\n-->'/*ion-inline-end:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__angular_http__["d" /* RequestOptions */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__["a" /* StatusBar */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VeritabaniProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_sqlite__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var VeritabaniProvider = /** @class */ (function () {
    function VeritabaniProvider(sqlite) {
        var _this = this;
        this.sqlite = sqlite;
        this.sqlite.create({
            name: 'cantografDB',
            location: 'default'
        }).then(function (db) {
            _this.veritabani = db;
            db.executeSql('CREATE TABLE IF NOT EXISTS tb_kisi(ID INTEGER PRIMARY KEY AUTOINCREMENT, NICKNAME TEXT, NICKNAME_ID INTEGER,IMG TEXT)', [])
                .then(function () { return console.log('tb_kisi: kod çalıştı'); }).catch(function (e) { return console.log(JSON.stringify(e + " tb_kisi create hatası")); });
            db.executeSql("CREATE TABLE IF NOT EXISTS tb_mesaj(ID INTEGER PRIMARY KEY AUTOINCREMENT, USER_ID INTEGER, MESSAGE TEXT, MY_MESSAGE TEXT,STATUS TEXT, DATE DATETIME DEFAULT (STRFTIME('%H:%M', 'NOW','localtime')))", [])
                .then(function () { return console.log('tb_mesaj: kod çalıştı'); }).catch(function (e) { return console.log(JSON.stringify(e + " tb_mesaj create hatası")); });
        }).catch(function (e) { return console.log(JSON.stringify(e) + " çalışma hatası"); });
    }
    VeritabaniProvider.prototype.kisiEkle = function (nickname, nickname_id, img) {
        var _this = this;
        var data = [nickname, nickname_id, img];
        var varMi;
        var sorgu;
        sorgu = 'SELECT ID from tb_kisi where NICKNAME_ID=' + nickname_id;
        return this.veritabani.executeSql(sorgu, []).then(function (res) {
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    varMi = 200;
                }
            }
            else {
                _this.veritabani.executeSql('INSERT INTO tb_kisi(NICKNAME,NICKNAME_ID,IMG) VALUES(?,?,?)', data);
            }
            return res;
        }).catch(function (e) { return console.log(JSON.stringify(e) + " kisi ekleme hatası."); });
    };
    VeritabaniProvider.prototype.mesajEkle = function (user_id, message, my_message, status) {
        var data = [user_id, message, my_message, status];
        return this.veritabani.executeSql('INSERT INTO tb_mesaj(USER_ID,MESSAGE,MY_MESSAGE,STATUS) VALUES(?,?,?,?)', data)
            .then(function (res) {
            return res;
        })
            .catch(function (e) { return console.log(JSON.stringify(e + " mesaj ekleme hatası.")); });
    };
    VeritabaniProvider.prototype.mesajSil = function () {
        this.veritabani.executeSql('DELETE FROM tb_mesaj', []);
        return this.veritabani.executeSql('DELETE FROM tb_kisi', [])
            .then(function (res) {
            return res;
        })
            .catch(function (e) { return console.log(JSON.stringify(e) + "mesaj silme hatası"); });
    };
    VeritabaniProvider.prototype.mesajOku = function (user_id) {
        var sorgu; //SEND sildim.
        sorgu = "SELECT * FROM tb_mesaj WHERE USER_ID=" + user_id;
        return this.veritabani.executeSql(sorgu, []).then(function (res) {
            var data = [];
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    data.push({
                        DATE: res.rows.item(i).DATE,
                        MESSAGE: res.rows.item(i).MESSAGE,
                        MY_MESSAGE: res.rows.item(i).MY_MESSAGE,
                        STATUS: res.rows.item(i).STATUS
                    });
                }
            }
            return data;
        }).catch(function (e) { return console.log(JSON.stringify(e) + 'mesaj okuma hatası'); });
    };
    VeritabaniProvider.prototype.kisiOku = function () {
        var sorgu;
        sorgu = "SELECT DISTINCT NICKNAME, * FROM tb_kisi ORDER BY ID DESC";
        return this.veritabani.executeSql(sorgu, []).then(function (res) {
            var data = [];
            var k_data = [];
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    k_data.push({
                        NICKNAME: res.rows.item(i).NICKNAME
                    });
                    if (k_data.indexOf(res.rows.item(i).NICKNAME) == -1) {
                        data.push({
                            ID: res.rows.item(i).ID,
                            NICKNAME: res.rows.item(i).NICKNAME,
                            NICKNAME_ID: res.rows.item(i).NICKNAME_ID,
                            IMG: res.rows.item(i).IMG,
                            USER_ID: res.rows.item(i).USER_ID
                        });
                    }
                }
            }
            //alert(JSON.stringify(data));
            return data;
        }).catch(function (e) { return console.log(JSON.stringify(e) + 'kisi okuma hatası'); });
    };
    VeritabaniProvider.prototype.durumGuncelle = function (user_id) {
        var _this = this;
        var sorgu;
        sorgu = 'SELECT MAX(ID) AS ID FROM tb_mesaj WHERE USER_ID=' + user_id;
        return this.veritabani.executeSql(sorgu, []).then(function (res) {
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    _this.mesajID = res.rows.item(i).ID;
                    var sorgu2;
                    sorgu2 = "UPDATE tb_mesaj SET STATUS = 'true' WHERE ID =" + _this.mesajID;
                    _this.veritabani.executeSql(sorgu2, [])
                        .then(function (res) {
                        return res;
                    })
                        .catch(function (e) { return console.log(JSON.stringify(e) + " durum güncelleme hatası."); });
                }
            }
        }).catch(function (e) { return console.log(JSON.stringify(e + " durum select hatası.")); });
    };
    VeritabaniProvider.prototype.tekrarGonder = function () {
        var sorgu;
        sorgu = "SELECT tb_mesaj.ID, tb_kisi.NICKNAME, tb_mesaj.MY_MESSAGE, tb_mesaj.STATUS FROM tb_mesaj left join tb_kisi ON tb_mesaj.USER_ID = tb_kisi.NICKNAME_ID WHERE STATUS = 'false' ORDER BY tb_mesaj.ID DESC";
        return this.veritabani.executeSql(sorgu, []).then(function (res) {
            var data = [];
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    data.push({
                        ID: res.rows.item(i).ID,
                        NICKNAME: res.rows.item(i).NICKNAME,
                        MY_MESSAGE: res.rows.item(i).MY_MESSAGE,
                        STATUS: res.rows.item(i).STATUS
                    });
                }
            }
            return data;
        }).catch(function (e) { return console.log(JSON.stringify(e) + 'tekrar gonder hatası'); });
    };
    VeritabaniProvider.prototype.otoSendGuncelle = function (mesaj_id) {
        var sorgu;
        sorgu = "UPDATE tb_mesaj SET STATUS = 'true' WHERE ID =" + mesaj_id;
        return this.veritabani.executeSql(sorgu, []).then(function (res) {
            return res;
        }).catch(function (e) { return console.log(JSON.stringify(e) + 'otoSend güncelleme hatası'); });
    };
    VeritabaniProvider.prototype.kisiVeMesajSil = function (nickname_id, user_id) {
        var sorgu;
        var sorgu2;
        sorgu = "DELETE FROM tb_kisi WHERE NICKNAME_ID =" + nickname_id;
        sorgu2 = "DELETE FROM tb_mesaj WHERE USER_ID =" + user_id;
        this.veritabani.executeSql(sorgu, []);
        return this.veritabani.executeSql(sorgu2, [])
            .then(function (res) {
            return res;
        });
    };
    VeritabaniProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__ionic_native_sqlite__["a" /* SQLite */]])
    ], VeritabaniProvider);
    return VeritabaniProvider;
}());

//# sourceMappingURL=veritabani.js.map

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var apiUrl = 'https://ilkcandogan.com/';
var homePoint = "videolar.php";
var endPoint = 'cikis.php';
var AuthServiceProvider = /** @class */ (function () {
    function AuthServiceProvider(http) {
        this.http = http;
        console.log('Hello AuthServiceProvider Provider');
    }
    AuthServiceProvider.prototype.private = function () {
        var _this = this;
        var r = apiUrl + endPoint;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Authorization', window.localStorage.getItem('token'));
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return new Promise(function (resolve, reject) {
            _this.http.post(r, options).subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    /* Home Page Sayfasının veri çekim Modülü */
    AuthServiceProvider.prototype.callServer = function (url) {
        var _this = this;
        var response;
        response = this.http.get(url).toPromise().then(function (responseData) { return responseData; })
            .catch(function (err) { return _this.errorDisplay(err); });
        return response;
    };
    /*Server'dan gelen hata */
    AuthServiceProvider.prototype.errorDisplay = function (error) {
        return Promise.reject(error.message || error);
    };
    AuthServiceProvider.prototype.logout = function () {
        window.localStorage.removeItem('token');
        return true;
    };
    AuthServiceProvider.prototype.getData = function () {
        return this.http.get(apiUrl + homePoint);
    };
    AuthServiceProvider.prototype.postData = function (credentials, type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            _this.http.post(apiUrl + type, JSON.stringify(credentials), { headers: headers }).
                subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    AuthServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], AuthServiceProvider);
    return AuthServiceProvider;
}());

//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profil_profil__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__video_yukle_video_yukle__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_media__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__popover_popover__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__likelist_likelist__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__reklam_reklam__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__login_login__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_auth_service_auth_service__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__haftanin_birincileri_haftanin_birincileri__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__haberler_haberler__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__chat_room_chat_room__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_veritabani_veritabani__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_ng_socket_io__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_rxjs_add_operator_map__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__yorumlar_yorumlar__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__kategoriler_kategoriler__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_admob_free__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__muzik_ara_muzik_ara__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_network__ = __webpack_require__(371);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



























var HomePage = /** @class */ (function () {
    function HomePage(viewCtrl, menuh, loadingCtrl, popoverCtrl, toastCtrl, alertCtrl, navCtrl, NavParams, media, file, auth, http, toastController, soket, admobFree, platform, veritabani, network, statusbar) {
        this.viewCtrl = viewCtrl;
        this.menuh = menuh;
        this.loadingCtrl = loadingCtrl;
        this.popoverCtrl = popoverCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.NavParams = NavParams;
        this.media = media;
        this.file = file;
        this.auth = auth;
        this.http = http;
        this.toastController = toastController;
        this.soket = soket;
        this.admobFree = admobFree;
        this.platform = platform;
        this.veritabani = veritabani;
        this.network = network;
        this.statusbar = statusbar;
        this.searchQuery = '';
        this.endpoint = "https://ilkcandogan.com/";
        this.isSearchBarOpened = false;
        this.openMenu = false;
        this.mediaFiles = [];
        this.count = 0;
        this.fakeUsers = new Array(5);
        var bannerConfig = {
            id: "ca-app-pub-2851043339565426/7453408132",
            isTesting: false,
            autoShow: true
        };
        this.admobFree.banner.config(bannerConfig);
        this.admobFree.banner.prepare()
            .then(function () {
            // banner Ad is ready
            // if we set autoShow to false, then we will need to call the show method here
        })
            .catch(function (e) { return console.log(e); });
        this.lottieConfig = {
            path: 'assets/imgs/homeload.json',
            renderer: 'canvas',
            autoplay: true,
            loop: true
        };
        this.lottieConfig2 = {
            path: 'assets/imgs/notfound.json',
            renderer: 'canvas',
            autoplay: true,
            loop: true
        };
        this.statusbar.overlaysWebView(false);
        this.statusbar.backgroundColorByHexString('#ce0e0e');
        //#region İnternet Bağlantı Kontrolü
        //#endregion
        this.baslangic();
        //#region 
        this.noRecord = false;
        this.lottieControl = false;
        window.localStorage.removeItem("idx");
        var DATA1 = window.localStorage.getItem('f_name');
        var DATA2 = window.localStorage.getItem('image');
        this.userDetails = DATA1;
        this.img = DATA2;
        console.log(window.localStorage.getItem('token'));
        console.log(window.localStorage.getItem('n_name'));
        console.log(window.localStorage.getItem('f_name'));
        console.log(window.localStorage.getItem('l_name'));
        console.log(window.localStorage.getItem('city'));
        console.log(window.localStorage.getItem('b_date'));
        console.log(window.localStorage.getItem('skor'));
        console.log(window.localStorage.getItem('coin'));
        console.log(window.localStorage.getItem('image'));
        console.log(window.localStorage.getItem('reg_frame_id'));
        console.log(window.localStorage.getItem('idf'));
        this.sayfa = NavParams.get('data');
        this.menuok();
        //#endregion
    }
    HomePage.prototype.chyonlendir = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_15__chat_room_chat_room__["a" /* ChatRoomPage */]);
    };
    HomePage.prototype.Giris = function () {
        var _this = this;
        if (window.localStorage.getItem('tekrar') === '0') {
            if (typeof this.soket.connect().id !== 'undefined') {
                this.soket.emit('giris-yap', window.localStorage.getItem('token'));
                window.localStorage.setItem('tekrar', "1");
            }
            else {
            }
        }
        else {
            //this.soket.emit('giris-yap', window.localStorage.getItem('token'));
        }
        this.soket.on('connect', function () {
            _this.soket.emit('giris-yap', window.localStorage.getItem('token'));
        });
    };
    HomePage.prototype.muzikAra = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_22__muzik_ara_muzik_ara__["a" /* MuzikAraPage */]);
    };
    HomePage.prototype.ionViewDidLoad = function () {
        if (this.platform.is('cordova')) {
            var bannerConfig = {
                id: "ca-app-pub-2851043339565426/4072644908",
                isTesting: false,
                autoShow: true
            };
            this.admobFree.banner.config(bannerConfig);
            this.admobFree.banner.prepare()
                .then(function () {
                // banner Ad is ready
                // if we set autoShow to false, then we will need to call the show method here
            })
                .catch(function (e) { return console.log(e); });
        }
    };
    HomePage.prototype.togglePopupMenu = function () {
        return this.openMenu = !this.openMenu;
    };
    HomePage.prototype.onViewDidLoad = function () {
        // Put here the code you want to execute
    };
    HomePage.prototype.delay = function (ms) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(function () { return resolve(); }, ms); }).then(function () { return console.log("fired"); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.yorumlar = function (myEvent, sParam) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_19__yorumlar_yorumlar__["a" /* YorumlarPage */], {
            mId: myEvent,
            yanitla: sParam
        });
    };
    HomePage.prototype.kategoriler = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_20__kategoriler_kategoriler__["a" /* KategorilerPage */]);
    };
    HomePage.prototype.toggleIcon = function (MUSIC_ID, L) {
        var _this = this;
        if (L === 'ios-thumbs-up-outline')
            try {
                var begeni = "1";
                var baseURL = 'https://ilkcandogan.com/';
                var baseParams = 'video_begeni.php';
                var testURL = (baseURL + baseParams);
                var authHeader = window.localStorage.getItem('token');
                var headersObj = new __WEBPACK_IMPORTED_MODULE_12__angular_http__["a" /* Headers */]();
                headersObj.append('Authorization', authHeader);
                var body = {
                    "muzik_id": MUSIC_ID,
                    "begeni": begeni
                };
                this.http.post(testURL, body, { headers: headersObj })
                    .map(function (res) { return res.json(); })
                    .subscribe(function (res) {
                    _this.homeLike = res;
                    _this.buttonIcon = "ios-thumbs-up";
                    _this.baslangic();
                    if (_this.homeLike["hata"] == "0") {
                        _this.hata0();
                    }
                    else {
                        console.log("İnternet Bağlantınızı Kontrol Ediniz.");
                    }
                    console.log(res);
                });
            }
            catch (_a) {
                this.hata9();
            }
        else if (L === 'ios-thumbs-up') {
            try {
                var begeni = "0";
                var baseURL = 'https://ilkcandogan.com/';
                var baseParams = 'video_begeni.php';
                var testURL = (baseURL + baseParams);
                var authHeader = window.localStorage.getItem('token');
                var headersObj = new __WEBPACK_IMPORTED_MODULE_12__angular_http__["a" /* Headers */]();
                headersObj.append('Authorization', authHeader);
                var body = {
                    "muzik_id": MUSIC_ID,
                    "begeni": begeni
                };
                this.http.post(testURL, body, { headers: headersObj })
                    .map(function (res) { return res.json(); })
                    .subscribe(function (res) {
                    _this.homeLike = res;
                    _this.buttonIcon = "ios-thumbs-up-outline";
                    _this.baslangic();
                    console.log(res);
                });
            }
            catch (_b) {
                this.hata9();
            }
        }
    };
    HomePage.prototype.myP = function (myEvent) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__profil_profil__["a" /* ProfilPage */], {
            mId: myEvent,
        });
    };
    HomePage.prototype.singappHaberler = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_14__haberler_haberler__["a" /* HaberlerPage */]);
    };
    HomePage.prototype.haftaninBirincileri = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_13__haftanin_birincileri_haftanin_birincileri__["a" /* HaftaninBirincileriPage */]);
    };
    HomePage.prototype.likepage = function (musicid) {
        this.likepagemusicid = musicid;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__likelist_likelist__["a" /* LikelistPage */], {
            likepagemusicid: musicid,
        });
    };
    HomePage.prototype.presentPopover = function (myEvent, myEvent2, myEvent3) {
        this.PId = myEvent;
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__popover_popover__["a" /* PopoverPage */], {
            idP: myEvent,
            Nickname: myEvent2,
            image: myEvent3
        });
    };
    HomePage.prototype.begeniGeriCek = function (MUSIC_ID) {
        var _this = this;
        if (this.buttonIcon === 'ios-thumbs-up-outline') {
            this.buttonIcon = "ios-thumbs-up";
            try {
                var begeni = "0";
                var baseURL = 'https://ilkcandogan.com/';
                var baseParams = 'video_begeni.php';
                var testURL = (baseURL + baseParams);
                var authHeader = window.localStorage.getItem('token');
                var headersObj = new __WEBPACK_IMPORTED_MODULE_12__angular_http__["a" /* Headers */]();
                headersObj.append('Authorization', authHeader);
                var body = {
                    "muzik_id": MUSIC_ID,
                    "begeni": begeni
                };
                this.http.post(testURL, body, { headers: headersObj })
                    .map(function (res) { return res.json(); })
                    .subscribe(function (res) {
                    _this.homeLike = res;
                    _this.baslangic();
                    if (_this.homeLike["hata"] == "0") {
                        _this.hata0();
                    }
                    else if (_this.homeLike["hata"] == "2") {
                        _this.hata2();
                    }
                    else {
                        console.log("İnternet Bağlantınızı Kontrol Ediniz.");
                    }
                    console.log(res);
                });
            }
            catch (_a) {
                this.hata9();
            }
        }
    };
    //#region Beğen Olayı
    HomePage.prototype.begen = function (MUSIC_ID) {
        var _this = this;
        try {
            var begeni = "1";
            var baseURL = 'https://ilkcandogan.com/';
            var baseParams = 'video_begeni.php';
            var testURL = (baseURL + baseParams);
            var authHeader = window.localStorage.getItem('token');
            var headersObj = new __WEBPACK_IMPORTED_MODULE_12__angular_http__["a" /* Headers */]();
            headersObj.append('Authorization', authHeader);
            var body = {
                "muzik_id": MUSIC_ID,
                "begeni": begeni
            };
            this.http.post(testURL, body, { headers: headersObj })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                _this.homeLike = res;
                _this.baslangic();
                if (_this.homeLike["hata"] == "0") {
                    _this.hata0();
                }
                else if (_this.homeLike["hata"] == "2") {
                    _this.hata2();
                }
                else {
                    console.log("İnternet Bağlantınızı Kontrol Ediniz.");
                }
                console.log(res);
            });
        }
        catch (_a) {
            this.hata9();
        }
    };
    //#endregion
    HomePage.prototype.doRefresh = function (event) {
        var _this = this;
        console.log('Begin async operation');
        setTimeout(function () {
            var baseURL = 'https://ilkcandogan.com/videolar.php';
            _this.http.get(baseURL + "?start=0")
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                console.log(res);
                _this.resposeData = res;
                _this.baslangic();
                event.complete();
            });
        }, 2000);
    };
    //#region İnfinite
    HomePage.prototype.doInfinite = function (InfiniteScroll) {
        var _this = this;
        return new Promise(function (resolve) {
            setTimeout(function () {
                var baseURL = 'https://ilkcandogan.com/videolar.php';
                _this.http.get(baseURL + "?start=" + _this.SSID)
                    .map(function (res) { return res.json(); })
                    .subscribe(function (res) {
                    console.log(res);
                    _this.resposeData = res;
                    _this.veri = _this.resposeData.bilgi;
                    if (_this.resposeData.bilgi.N_NAME !== null) {
                        if (_this.resposeData.SON_ID !== null) {
                            for (var index = 0; index < _this.veri.length; index++) {
                                _this.users.push(_this.veri[index]);
                            }
                        }
                        else {
                            _this.noRecord = true;
                        }
                    }
                    _this.SSID = res.SON_ID;
                    InfiniteScroll.complete();
                }, function (err) {
                });
            }, 4000);
        });
    };
    //#endregion
    //#region Başlangıçta çalışan istek Metodu
    HomePage.prototype.baslangic = function () {
        var _this = this;
        this.SSID = 0;
        var baseURL = 'https://ilkcandogan.com/videolar.php';
        var authHeader = JSON.stringify(window.localStorage.getItem('token'));
        var headersObj = new __WEBPACK_IMPORTED_MODULE_12__angular_http__["a" /* Headers */]();
        headersObj.append('Authorization', authHeader);
        this.http.get(baseURL + "?start=" + this.SSID, { headers: headersObj })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res);
            _this.users = res.bilgi;
            _this.SSID = res.SON_ID;
            _this.likeControl = res.bilgi;
            if (_this.SSID == null) {
                _this.lottieControl = true;
            }
            _this.Giris();
        }, function (err) {
        });
        //#region OneSignal
        if (window.localStorage.getItem('PlayId') != null && window.localStorage.getItem('PlayIdCheck') == null) {
            this.playIdGonder(window.localStorage.getItem('PlayId'), window.localStorage.getItem('token'));
        }
        //#endregion
    };
    HomePage.prototype.playIdGonder = function (play_id, token) {
        var URL = 'https://ilkcandogan.com/player_id.php';
        var authHeader = token;
        var body = {
            "player_id": play_id,
            "Authorization": authHeader
        };
        this.http.post(URL, body)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            //console.log(res);
            if (res["hata"] == "0") {
                window.localStorage.setItem('PlayIdCheck', '1');
            }
        });
    };
    //#endregion
    //#region Çıkış(credentials)
    HomePage.prototype.yaz = function (credentials) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Çıkış Yapılıyor"
        });
        loader.present();
        var baseURL = 'https://ilkcandogan.com/';
        var baseParams = 'cikis.php';
        var testURL = (baseURL + baseParams);
        var authHeader = JSON.stringify(window.localStorage.getItem('token'));
        var headersObj = new __WEBPACK_IMPORTED_MODULE_12__angular_http__["a" /* Headers */]();
        headersObj.append('Authorization', authHeader);
        this.http.post(testURL, JSON.stringify(credentials), { headers: headersObj })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            /*   this.webReturn = res; */
            window.localStorage.removeItem('token');
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__login_login__["a" /* LoginPage */]);
            loader.dismiss();
        });
    };
    //#endregion
    HomePage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    HomePage.prototype.menuok = function () {
        this.menuh.enable(true);
    };
    HomePage.prototype.Profil = function (myEvent) {
        this.profilID = myEvent;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__profil_profil__["a" /* ProfilPage */], {
            idP: myEvent,
        });
    };
    HomePage.prototype.bildirilerTetikle = function (MUSIC_ID) {
        var _this = this;
        var baseURL = 'https://ilkcandogan.com/';
        var baseParams = 'video_sikayet.php';
        var testURL = (baseURL + baseParams);
        var authHeader = window.localStorage.getItem('token');
        var headersObj = new __WEBPACK_IMPORTED_MODULE_12__angular_http__["a" /* Headers */]();
        headersObj.append('Authorization', authHeader);
        var body = {
            "video_id": MUSIC_ID
        };
        this.http.post(testURL, body, { headers: headersObj })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.bildiriDegisken = res;
            console.log(_this.bildiriDegisken);
            if (_this.bildiriDegisken["hata"] == "0") {
                _this.hatabildir0();
            }
            else if (_this.bildiriDegisken["hata"] == "3") {
                _this.hatabildir1();
            }
            else {
                console.log("İnternet Bağlantınızı Kontrol Ediniz.");
            }
            console.log(res);
        });
    };
    //#region Alet ve Toastlar
    HomePage.prototype.reklam = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__reklam_reklam__["a" /* ReklamPage */]);
    };
    HomePage.prototype.lToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Videoyu beğendim',
            duration: 2000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    HomePage.prototype.dToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Videoyu beğenmedim',
            duration: 2000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    HomePage.prototype.indirToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Videonuz indiriliyor',
            duration: 2000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    //#endregion
    HomePage.prototype.hata0 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Videoyu Beğendiniz.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.hatabildir0 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Kullanıcı Şikayet Edildi',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.hatabildir1 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Kullanıcıyı Zaten Şikayet Ettiniz.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.hata2 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Videoyu Zaten Beğenmişsiniz.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.hata9 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Belirlenemeyen bir hata oluştu.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.hata6 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Videoyu Zaten Beğenmediniz.',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.hata3 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'Videoyu Beğenmediniz. ',
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.EkleSekmesi = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__video_yukle_video_yukle__["a" /* VideoYuklePage */]);
    };
    HomePage.prototype.profilSekmesi = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__profil_profil__["a" /* ProfilPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myvideo'),
        __metadata("design:type", Object)
    ], HomePage.prototype, "myVideo", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\home\home.html"*/'<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<ion-header>\n  <ion-navbar color="dark" hideBackButton>\n\n    <button ion-button icon-only show menuToggle style=" margin-top:6%;">\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <img style="margin-left: 6; margin-top:10%; background-color: #ce0e0e;" alt="Company Logo" height="50px"\n      width="130px" src="assets/imgs/slogo.png">\n\n\n\n    <ion-buttons end style="margin-top:6%;">\n      <div>\n        <button id="notification-button" ion-button clear xl (click)=\'muzikAra()\'>\n          <ion-icon name="search" color="label-color">\n\n          </ion-icon>\n        </button>\n      </div>\n    </ion-buttons>\n    <ion-buttons end style="margin-top:6%;">\n        <div>\n          <button id="notification-button" ion-button clear xl (click)="reklam()">\n            <ion-icon name="ios-nutrition" color="secondary">\n  \n            </ion-icon>\n          </button>\n        </div>\n      </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Aşağı Kaydırdığınızda Yenilenir."\n      refreshingSpinner="crescent" refreshingText="Yenileniyor...">\n    </ion-refresher-content>\n  </ion-refresher>\n \n \n\n\n  <div class="canvasi" *ngIf="!users">\n    <lottie-animation-view *ngIf="!users" [options]="lottieConfig" [width]="300" [height]="300">\n    </lottie-animation-view>\n  </div>\n  <div class="canvasi" *ngIf="!users">\n    <lottie-animation-view *ngIf="!users" [options]="lottieConfig" [width]="300" [height]="300">\n    </lottie-animation-view>\n  </div>\n  <div class="canvasi" *ngIf="!users">\n    <lottie-animation-view *ngIf="!users" [options]="lottieConfig" [width]="300" [height]="300">\n    </lottie-animation-view>\n  </div>\n  <div class="canvasi" *ngIf="lottieControl">\n    <lottie-animation-view *ngIf="lottieControl" [options]="lottieConfig2" [width]="300" [height]="300">\n    </lottie-animation-view>\n  </div>\n  <p *ngIf="lottieControl" style="font-size: 24px; color:#564f4f; width:100%; text-align:center;">Henüz içerik yok</p>\n  <autoplay-content>\n  <ion-card no-padding *ngFor="let user of users" style="margin-top:40px; margin-bottom: 10px;">\n\n    <ion-item>\n      <ion-avatar item-start>\n        <img src="{{user.IMAGE}}" (click)="presentPopover(user.USER_ID,user.N_NAME,user.IMAGE)">\n      </ion-avatar>\n      <strong>\n        <h2>{{user.N_NAME}}</h2>\n      </strong>\n    </ion-item>\n<div>\n    <video width="900" height="180"  poster="{{user.THUMB}}">      \n      <source src="{{user.VIDEO}}#t=0" type="video/mp4">\n      Videonuz Yüklenemiyor\n    </video>\n  </div>\n    <ion-card-content>\n      <ion-chip color="label-color">\n        <ion-icon name="md-time"></ion-icon>\n        <ion-label color="danger">\n          <p style="color:rgb(0, 35, 102); font-size:3.5vw"><strong>Yüklenme Tarihi : </strong>{{user.UPLOAD_DATE}}</p>\n        </ion-label>\n      </ion-chip>\n    </ion-card-content>\n    <ion-card-content>\n      <ion-chip color="label-color">\n        <ion-icon name="md-create"></ion-icon> \n        <ion-label color="danger">\n          <div>\n         <p style="color:rgb(0, 35, 102); text-align:left; font-size:3.5vw;  margin-right: 2px; float: right; "><strong>Söz Müzik : </strong>{{user.MELODY_NAME_SURNAME}}</p>\n         <div style="float: right;"></div>\n        </div>\n        </ion-label>\n     \n      </ion-chip>\n    </ion-card-content>\n    <ion-card-content>\n      <ion-chip color="label-color">\n        <ion-icon name="ios-microphone"></ion-icon>\n        <ion-label color="dark">\n          <p style="color:rgb(0, 35, 102); font-size:3vw; padding-right: 2px; font-size:3.5vw "><strong>Şarkı : </strong>{{user.MUSIC_NAME}}</p>\n        </ion-label>\n      </ion-chip>\n    </ion-card-content>\n    <ion-card-content>\n      <ion-chip color="label-color">\n        <ion-icon name="md-musical-notes"></ion-icon>\n        <ion-label color="dark">\n          <p style="color:rgb(0, 35, 102); font-size:3vw; font-size:3.5vw"><strong>Tür : </strong>{{user.CATEGORY_NAME}}</p>\n        </ion-label>\n      </ion-chip>\n    </ion-card-content>\n    <br>\n    <br>\n    <p style="font-family: Arial, Helvetica, sans-serif; margin-left:5%; color: gray;" (click)="likepage(user.MUSIC_ID)">{{user.LIKES}} Beğenme</p>\n    <ion-row>\n      <ion-col>\n        <button ion-button color="primary" clear small icon-start (click)="toggleIcon(user.MUSIC_ID,user.L)">\n          <ion-icon [name]="user.L"></ion-icon>\n          BEĞEN\n        </button>\n      </ion-col>\n      <ion-col>\n        <button ion-button color="primary" clear small icon-start (click)="yorumlar(user.MUSIC_ID)">\n          <ion-icon name=\'text\'></ion-icon>\n          Yorum Yap\n          &nbsp;<ion-badge item-end>{{user.COMMENT_TOTAL}}</ion-badge>\n        </button>\n\n      </ion-col>\n      <ion-col>\n        <button ion-button color="primary" clear small icon-start (click)="bildirilerTetikle(user.MUSIC_ID)">\n          <ion-icon name=\'ios-flame\'></ion-icon>\n          Bildir\n        </button>\n      </ion-col>\n\n    </ion-row>\n  \n    <div class="divider div-transparent"></div>\n  </ion-card>\n</autoplay-content>\n  <br>\n  <br>\n  <br>\n  <strong>\n    <p *ngIf="noRecord" style="color:rgb(160, 154, 154); margin-top: 0px;  text-align:center;">Daha Fazla Gönderi\n      Bulunamamaktadır.</p>\n  </strong>\n  <br>\n\n  <ion-infinite-scroll style="height:1vh;" (ionInfinite)="doInfinite($event)" *ngIf="!noRecord">\n    <ion-infinite-scroll-content loadingSpinner="crescent" loadingText="Yükleniyor...">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\home\home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_media__["a" /* Media */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_11__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_12__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_17_ng_socket_io__["Socket"], __WEBPACK_IMPORTED_MODULE_21__ionic_native_admob_free__["a" /* AdMobFree */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_16__providers_veritabani_veritabani__["a" /* VeritabaniProvider */], __WEBPACK_IMPORTED_MODULE_23__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YorumlarPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__popover_popover__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var YorumlarPage = /** @class */ (function () {
    function YorumlarPage(navCtrl, navParams, http, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.diger = window.localStorage.getItem('idf');
        this.fakeUsers = new Array;
        this.lottieConfig = {
            path: 'assets/imgs/commentskeleton.json',
            renderer: 'canvas',
            autoplay: true,
            loop: true
        };
        this.mId = navParams.get('mId');
        this.noRecord = false;
        this.cek();
        console.log(this.mId);
    }
    YorumlarPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad YorumlarPage');
    };
    YorumlarPage.prototype.cek = function () {
        var _this = this;
        this.SSID = 0;
        var baseURL = 'https://ilkcandogan.com/video_yorumlar.php?muzik_id=';
        var authHeader = JSON.stringify(window.localStorage.getItem('token'));
        var headersObj = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headersObj.append('Authorization', authHeader);
        this.http.get(baseURL + this.mId + "&start=" + this.SSID, { headers: headersObj })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res);
            _this.kullaniciYorum = res.comments;
            _this.SSID = res.SON_ID;
            console.log(_this.kullaniciYorum);
        }, function (err) {
        });
    };
    YorumlarPage.prototype.doInfinite = function (InfiniteScroll) {
        var _this = this;
        return new Promise(function (resolve) {
            setTimeout(function () {
                var baseURL = 'https://ilkcandogan.com/video_yorumlar.php?muzik_id=';
                var headersObj = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
                var authHeader = JSON.stringify(window.localStorage.getItem('token'));
                headersObj.append('Authorization', authHeader);
                _this.http.get(baseURL + _this.mId + "&start=" + _this.SSID, { headers: headersObj })
                    .map(function (res) { return res.json(); })
                    .subscribe(function (res) {
                    console.log(res);
                    _this.resposeData = res;
                    _this.veri = _this.resposeData.comments;
                    if (_this.resposeData.comments !== null) {
                        if (_this.veri.length > 0) {
                            for (var index = 0; index < _this.veri.length; index++) {
                                _this.kullaniciYorum.push(_this.veri[index]);
                            }
                        }
                        else {
                            _this.noRecord = true;
                        }
                    }
                    _this.SSID = res.SON_ID;
                    InfiniteScroll.complete();
                }, function (err) {
                });
            }, 4000);
        });
    };
    YorumlarPage.prototype.yorumYap = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Yorumunuz Yükleniyor."
        });
        loader.present();
        var baseURL = 'https://ilkcandogan.com/';
        var baseParams = 'video_yorum_yap.php';
        var testURL = (baseURL + baseParams);
        var authHeader = JSON.stringify(window.localStorage.getItem('token'));
        var body = {
            "muzik_id": this.mId,
            "yorum": this.comment
        };
        var headersObj = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headersObj.append('Authorization', authHeader);
        this.http.post(testURL, body, { headers: headersObj })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.cek();
            loader.dismiss();
            _this.comment = "";
            console.log(res);
        });
    };
    //#endregion
    YorumlarPage.prototype.presentPopover = function (myEvent, myEvent2, myEvent3) {
        this.PId = myEvent;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__popover_popover__["a" /* PopoverPage */], {
            idP: myEvent,
            Nickname: myEvent2,
            image: myEvent3
        });
    };
    YorumlarPage.prototype.commentYanitla = function (N_NAME) {
        var yComment = "@" + N_NAME;
        this.comment = yComment;
    };
    YorumlarPage.prototype.Sil = function (COMMENT_ID) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Yorumunuz Siliniyor."
        });
        loader.present();
        var yorum_id = COMMENT_ID;
        var sil = "1";
        var baseURL = 'https://ilkcandogan.com/';
        var baseParams = 'video_yorum_duzenle.php';
        var testURL = (baseURL + baseParams);
        var authHeader = window.localStorage.getItem('token');
        var headersObj = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headersObj.append('Authorization', authHeader);
        var body = {
            "yorum_id": yorum_id,
            "sil": sil
        };
        console.log(yorum_id);
        this.http.post(testURL, body, { headers: headersObj })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.cek();
            loader.dismiss();
            console.log(res);
        });
    };
    YorumlarPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-yorumlar',template:/*ion-inline-start:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\yorumlar\yorumlar.html"*/'<!--\n  Generated template for the YorumlarPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="dark">\n    <ion-title center>Yorumlar</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n  <ion-content padding>\n    <div class="canvasi" *ngIf="!kullaniciYorum">\n      <lottie-animation-view *ngIf="!kullaniciYorum"\n      [options]="lottieConfig"\n      [width]="300"\n      [height]="300"\n      >\n    </lottie-animation-view>\n    </div>\n      \n   <ion-card *ngFor="let user of kullaniciYorum">\n    <ion-item>\n      <ion-avatar item-start>\n        <img src="{{user.IMAGE}}" (click)="presentPopover(user.USER_ID,user.N_NAME,user.IMAGE)">\n      </ion-avatar>\n      <h2>{{user.N_NAME}}</h2>\n      <ion-note>\n        {{user.DATE}}\n       </ion-note>\n    </ion-item>\n    <ion-card-content>\n      <p>{{user.COMMENT}}</p>\n    </ion-card-content>\n    <ion-row>\n      <ion-col col-3 *ngIf="user.USER_ID != diger">\n        <button ion-button color="primary"   clear small icon-left (click)="commentYanitla(user.N_NAME)">\n        <ion-icon item-left name=\'text\'></ion-icon>\n        Yanıtla\n      </button>\n      </ion-col>\n      <ion-col col-3 *ngIf="user.USER_ID == diger">\n        <button ion-button color="primary"  clear small icon-left (click)="Sil(user.COMMENT_ID)">\n        <ion-icon item-right name=\'ios-trash\'></ion-icon>\n        Sil\n      </button>\n      </ion-col>\n    </ion-row>      \n    <div class="divider div-transparent"></div>\n  </ion-card>\n\n\n \n   \n \n        <strong><p *ngIf="noRecord" style="color:rgb(160, 154, 154);  text-align:center;">Daha Fazla Kullanıcı Yorumu Bulunmamaktadır</p></strong>\n    \n\n      <ion-infinite-scroll style="height:5vh;" (ionInfinite)="doInfinite($event)" *ngIf="!noRecord">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n      </ion-infinite-scroll>\n     \n  </ion-content>\n  \n  <ion-footer>\n      <ion-toolbar>\n        <ion-item >\n          <ion-input placeholder="Yorumunuz" type="username" [(ngModel)]="comment" floating>     \n          </ion-input> \n          \n          <button ion-button clear xl item-right (click)="yorumYap()"><strong>Yorum Yap</strong><p></p> \n            <ion-icon name="ios-send">           \n            </ion-icon>\n            \n\n          </button> \n        </ion-item>\n          \n      </ion-toolbar>\n    </ion-footer>\n    '/*ion-inline-end:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\pages\yorumlar\yorumlar.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], YorumlarPage);
    return YorumlarPage;
}());

//# sourceMappingURL=yorumlar.js.map

/***/ }),

/***/ 772:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_autoplay_content_autoplay_content__ = __webpack_require__(773);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__components_autoplay_content_autoplay_content__["a" /* AutoplayContentComponent */]],
            imports: [],
            exports: [__WEBPACK_IMPORTED_MODULE_1__components_autoplay_content_autoplay_content__["a" /* AutoplayContentComponent */]]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 773:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AutoplayContentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directives_autoplay_video_autoplay_video__ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AutoplayContentComponent = /** @class */ (function () {
    function AutoplayContentComponent(element, ngZone) {
        this.element = element;
        this.ngZone = ngZone;
    }
    AutoplayContentComponent.prototype.ngOnInit = function () {
        var _this = this;
        // we can run this outside the ngZone, no need
        // to trigger change detection
        this
            .ngZone
            .runOutsideAngular(function () {
            _this.intersectionObserver = _this.getIntersectionObserver();
            _this.mutationObserver = _this.getMutationObserver(_this.element.nativeElement);
        });
    };
    // clean things ups
    AutoplayContentComponent.prototype.ngOnDestroy = function () {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
        }
    };
    // construct the InterSectionObserver and return it
    AutoplayContentComponent.prototype.getIntersectionObserver = function () {
        var _this = this;
        var intersectionObserver = new IntersectionObserver(
        // execute the onIntersection on ...
        function (entries) { return _this.onIntersection(entries); }, {
            // the threshold intersection of 0 and 50%
            threshold: [0, 0.7]
        });
        return intersectionObserver;
    };
    // construct the MutationObserver and return it
    AutoplayContentComponent.prototype.getMutationObserver = function (containerElement) {
        var _this = this;
        var mutationObserver = new MutationObserver(
        // execute the onDomChange
        function () { return _this.onDomChange(); });
        // at the very least, childList, attributes, or characterData
        // must be set to true
        var config = {
            attributes: true,
            characterData: true,
            childList: true
        };
        // attach the mutation observer to the container element
        // and start observing it
        mutationObserver.observe(containerElement, config);
        return mutationObserver;
    };
    AutoplayContentComponent.prototype.onDomChange = function () {
        var _this = this;
        // when the DOM changes, loop over each element
        // we want to observe for its interection,
        // and do observe it
        this
            .autoPlayVideoRefs
            .forEach(function (video) {
            _this
                .intersectionObserver
                .observe(video.nativeElement);
        });
    };
    AutoplayContentComponent.prototype.onIntersection = function (entries) {
        var _this = this;
        entries
            .forEach(function (entry) {
            // get the video element
            var video = entry.target;
            // are we intersecting?
            if (!entry.isIntersecting) {
                return;
            }
            // play the video if we passed the threshold
            // of 0.5 and store the promise so we can safely
            // pause it again
            if (entry.intersectionRatio >= 0.7) {
                // for demo purposes we use a single video
                // this code can easely be 
                // extended to support multiple videos
                if (_this.play === undefined) {
                    _this.play = video.play();
                }
            }
            else if (entry.intersectionRatio < 0.7) {
                // no need to pause something if it didn't start
                // playing yet.
                if (_this.play !== undefined) {
                    // wait for the promise to resolve,
                    // then pause the video
                    _this
                        .play
                        .then(function (_) {
                        video.pause();
                        _this.play = undefined;
                    });
                }
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ContentChildren"])(__WEBPACK_IMPORTED_MODULE_0__directives_autoplay_video_autoplay_video__["a" /* AutoplayVideoDirective */], {
            read: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"],
            descendants: true
        }),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["QueryList"])
    ], AutoplayContentComponent.prototype, "autoPlayVideoRefs", void 0);
    AutoplayContentComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'autoplay-content',
            template: "<ng-content></ng-content>"
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"],
            __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgZone"]])
    ], AutoplayContentComponent);
    return AutoplayContentComponent;
}());

//# sourceMappingURL=autoplay-content.js.map

/***/ }),

/***/ 774:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DirectivesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__autoplay_video_autoplay_video__ = __webpack_require__(414);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DirectivesModule = /** @class */ (function () {
    function DirectivesModule() {
    }
    DirectivesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__autoplay_video_autoplay_video__["a" /* AutoplayVideoDirective */]],
            imports: [],
            exports: [__WEBPACK_IMPORTED_MODULE_1__autoplay_video_autoplay_video__["a" /* AutoplayVideoDirective */]]
        })
    ], DirectivesModule);
    return DirectivesModule;
}());

//# sourceMappingURL=directives.module.js.map

/***/ }),

/***/ 775:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_haberler_haberler__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_haftanin_birincileri_haftanin_birincileri__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_hakkinda_hakkinda__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_kategoriler_kategoriler__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_profil_profil__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_sss_sss__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_video_yukle_video_yukle__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_home_home__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_cikis_cikis__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ng_socket_io__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_veritabani_veritabani__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_native_audio__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_local_notifications__ = __webpack_require__(413);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




















var MyApp = /** @class */ (function () {
    function MyApp(platform, _statusBar, splashScreen, http, loadingCtrl, statusBar, soket, veritabani, nativeAudio, localNotifications, alertCtrl) {
        var _this = this;
        this.platform = platform;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.statusBar = statusBar;
        this.soket = soket;
        this.veritabani = veritabani;
        this.nativeAudio = nativeAudio;
        this.localNotifications = localNotifications;
        this.alertCtrl = alertCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */];
        this.dizi = [];
        this.platform.ready().then(function () {
            splashScreen.hide();
            if (splashScreen) {
                setTimeout(function () {
                    splashScreen.hide();
                }, 100);
            }
            ;
            _this.pages = [
                { title: 'Anasayfa', icon: 'home', component: __WEBPACK_IMPORTED_MODULE_12__pages_home_home__["a" /* HomePage */], category: "0" },
                { title: 'Profilim', icon: 'md-contact', component: __WEBPACK_IMPORTED_MODULE_9__pages_profil_profil__["a" /* ProfilPage */], category: "1" },
                { title: 'Kategoriler', icon: 'ios-apps', component: __WEBPACK_IMPORTED_MODULE_7__pages_kategoriler_kategoriler__["a" /* KategorilerPage */], category: "2" },
                { title: 'Singraf Magazin', icon: 'ios-flower', component: __WEBPACK_IMPORTED_MODULE_4__pages_haberler_haberler__["a" /* HaberlerPage */], category: "3" },
                { title: 'Video Yükle', icon: 'md-videocam', component: __WEBPACK_IMPORTED_MODULE_11__pages_video_yukle_video_yukle__["a" /* VideoYuklePage */], category: "4" },
                { title: 'Haftanın Birincileri', icon: 'trophy', component: __WEBPACK_IMPORTED_MODULE_5__pages_haftanin_birincileri_haftanin_birincileri__["a" /* HaftaninBirincileriPage */], category: "5" },
                { title: 'Hakkında', icon: 'ios-leaf', component: __WEBPACK_IMPORTED_MODULE_6__pages_hakkinda_hakkinda__["a" /* HakkindaPage */], category: "6" },
                { title: ' SSS', icon: 'md-help', component: __WEBPACK_IMPORTED_MODULE_10__pages_sss_sss__["a" /* SssPage */], category: "7" },
                { title: ' Çıkış Yap', icon: 'power', component: __WEBPACK_IMPORTED_MODULE_14__pages_cikis_cikis__["a" /* CikisPage */], category: "7" }
            ];
            _this.activePage = _this.pages[8];
            ///****/// --------------------------------------------------------------
            var notificationOpenedCallback = function (jsonData) {
            };
            window["plugins"].OneSignal
                .startInit("54fefc70-82d0-4a42-aea9-ed10af754f4c", "210975147575ioni")
                .endInit();
            window["plugins"].OneSignal.addSubscriptionObserver(function (state) {
                if (!state.from.subscribed && state.to.subscribed) {
                    console.log("Subscribed for OneSignal push notifications!");
                    // get player ID
                    //alert(state.to.userId)
                }
                //console.log("Push Subscription state changed: " + JSON.stringify(state));
                //        .handleNotificationOpened(notificationOpenedCallback)
                //window.localStorage.setItem('PlayId',state.to.userId);
                //alert("ID Değeri: " +  window.localStorage.getItem('PlayId'));
                if (window.localStorage.getItem('PlayId') == null) {
                    if (state.to.userId != null && window.localStorage.getItem('token') != null) {
                        this.playIdGonder(state.to.userId, window.localStorage.getItem('token'));
                    }
                    else if (state.to.userId != null) {
                        window.localStorage.setItem('PlayId', state.to.userId);
                    }
                }
                26;
            });
            ///****/// --------------------------------------------------------------
        });
        this.tokenuzunluk = window.localStorage.getItem('token');
        if (window.localStorage.getItem('token')) {
            if (this.tokenuzunluk.length > 40) {
                this.rootPage = __WEBPACK_IMPORTED_MODULE_12__pages_home_home__["a" /* HomePage */];
            }
            else {
                window.localStorage.removeItem('token');
                this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */];
            }
        }
        window.localStorage.setItem('tekrar', '0');
        //#region Chat
        this.mesajGetir().subscribe(function (mesaj) {
            _this.veritabani.kisiEkle(mesaj['kimden'], mesaj['kimden_id'], mesaj['profil']).then(function (res) {
                _this.veritabani.mesajEkle(mesaj['kimden_id'], mesaj['MESSAGE'], '', true);
            });
            _this.nativeAudio.preloadSimple('bildirim', 'assets/imgs/mesaj.mp3');
            _this.nativeAudio.play('bildirim');
            _this.nativeAudio.setVolumeForComplexAsset('bildirim', 1);
            _this.localNotifications.schedule({
                id: 1,
                icon: mesaj['profil'],
                title: mesaj['kimden'],
                text: mesaj['MESSAGE'],
                led: 'FF0000',
                sound: 'assets/imgs/mesaj.mp3',
            });
        });
        this.connectCheck().subscribe(function (mesaj) {
            _this.veritabani.tekrarGonder().then(function (res) {
                _this.dizi = res;
                _this.uzunluk = _this.dizi.length - 1;
                var element = _this.dizi[_this.uzunluk];
                var iid = element['ID'];
                var nname = element['NICKNAME'];
                var mymessage = element['MY_MESSAGE'];
                _this.soket.emit('mesaj-gonder', {
                    alici: nname,
                    mesaj: mymessage
                });
                _this.veritabani.otoSendGuncelle(iid);
                _this.uzunluk--;
                //this.soket.emit('mesaj-dizi',this.dizi);
            });
        });
        this.reSend().subscribe(function (mesaj) {
            if (_this.uzunluk !== -1) {
                var element = _this.dizi[_this.uzunluk];
                var iid = element['ID'];
                var nname = element['NICKNAME'];
                var mymessage = element['MY_MESSAGE'];
                _this.soket.emit('mesaj-gonder', {
                    alici: nname,
                    mesaj: mymessage
                });
                _this.veritabani.otoSendGuncelle(iid);
                _this.uzunluk--;
            }
            else {
            }
        });
        //#endregion
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
        });
    };
    MyApp.prototype.openPage = function (page) {
        this.activePage = page;
        this.nav.setRoot(page.component);
        this.activePage = page;
    };
    MyApp.prototype.checkActivePage = function (page) {
        return page = this.activePage;
    };
    //#region ChatObserver
    MyApp.prototype.mesajGetir = function () {
        var _this = this;
        var observable = new __WEBPACK_IMPORTED_MODULE_17_rxjs_Observable__["Observable"](function (observer) {
            _this.soket.on('mesaj', function (data) {
                observer.next(data);
            });
        });
        return observable;
    };
    MyApp.prototype.connectCheck = function () {
        var _this = this;
        var observable = new __WEBPACK_IMPORTED_MODULE_17_rxjs_Observable__["Observable"](function (observer) {
            _this.soket.on('baglanti-callback', function (data) {
                observer.next(data);
            });
        });
        return observable;
    };
    MyApp.prototype.reSend = function () {
        var _this = this;
        var observable = new __WEBPACK_IMPORTED_MODULE_17_rxjs_Observable__["Observable"](function (observer) {
            _this.soket.on('re-send', function (data) {
                observer.next(data);
            });
        });
        return observable;
    };
    //#endregion
    MyApp.prototype.playIdGonder = function (play_id, token) {
        var URL = 'https://ilkcandogan.com/player_id.php';
        var authHeader = token;
        var body = {
            "player_id": play_id,
            "Authorization": authHeader
        };
        this.http.post(URL, body)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            //console.log(res);
            if (res["hata"] == "0") {
                window.localStorage.setItem('PlayId', play_id);
                window.localStorage.setItem('PlayIdCheck', '1');
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\app\app.html"*/'<ion-menu [content]="content" id="menu-avatar">\n        <ion-content>\n          <div #header>\n            <ion-row style="align-items:center;">\n              <ion-col col-3>\n                <img src="assets/imgs/left.png" />\n                <span class="icon-badge"></span>\n              </ion-col>\n              <ion-col col-6 >\n                <img class="user-avatar round" [src]="chosenPicture || placeholder" onerror="this.src=\'assets/imgs/slogo.png\'"\n                />\n              </ion-col>\n              <ion-col col-3>\n                <img src="assets/imgs/left.png" />\n              </ion-col>\n            </ion-row>\n          </div>\n          <ion-list no-lines>\n            <button menuClose ion-item detail-none *ngFor="let p of pages" (click)="openPage(p)">\n              <ion-icon color="secondary" [name]="p.icon" item-left></ion-icon>\n              {{p.title}}\n            </button>\n          </ion-list>\n        </ion-content>\n      </ion-menu>\n\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"C:\Users\Ali\Desktop\singapp121\singapp121\singapp\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_13__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_15_ng_socket_io__["Socket"],
            __WEBPACK_IMPORTED_MODULE_16__providers_veritabani_veritabani__["a" /* VeritabaniProvider */], __WEBPACK_IMPORTED_MODULE_18__ionic_native_native_audio__["a" /* NativeAudio */], __WEBPACK_IMPORTED_MODULE_19__ionic_native_local_notifications__["a" /* LocalNotifications */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[416]);
//# sourceMappingURL=main.js.map