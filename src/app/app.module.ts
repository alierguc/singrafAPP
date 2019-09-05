import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MediaCapture } from '@ionic-native/media-capture';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file'; 
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import {FileTransfer,FileTransferObject} from '@ionic-native/file-transfer';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { IonicStorageModule } from '@ionic/storage';
import {HttpModule} from '@angular/http';
import { AdMobFree } from '@ionic-native/admob-free';
import {Device} from '@ionic-native/device';
import { Network } from '@ionic-native/network';
import { NativeAudio } from '@ionic-native/native-audio';
import { LottieAnimationViewModule } from 'ng-lottie';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { LocalNotifications } from '@ionic-native/local-notifications';
import {ProgressBarModule} from "angular-progress-bar"
import { IonicSimpleProgressBarModule, SimpleProgressBarProvider } from 'ionic-progress-bar';
import { ComponentsModule } from './../components/components.module';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { DirectivesModule } from './../directives/directives.module';
//#region Sayfalar

import {MpCommentPage} from '../pages/mp-comment/mp-comment';
import {CikisPage} from '../pages/cikis/cikis';
import {MuzikAraPage} from '../pages/muzik-ara/muzik-ara';
import {BioDuzenlePage} from '../pages/bio-duzenle/bio-duzenle';
import {VideoYukleicerikPage} from '../pages/video-yukleicerik/video-yukleicerik';
import {HabericerikPage} from '../pages/habericerik/habericerik';
import {HaberlerPage} from '../pages/haberler/haberler';
import {HaftaninBirincileriPage} from '../pages/haftanin-birincileri/haftanin-birincileri';
import {HakkindaPage} from '../pages/hakkinda/hakkinda';
import {KategorilerPage} from '../pages/kategoriler/kategoriler';
import {PopupModalPage} from '../pages/popup-modal/popup-modal';
import {LoginPage} from '../pages/login/login';
import {PresimonizlePage} from '../pages/presimonizle/presimonizle';
import {PResimYuklePage} from '../pages/p-resim-yukle/p-resim-yukle';
import {ProfilPage} from '../pages/profil/profil';
import {ReklamPage} from '../pages/reklam/reklam';
import {FullScreenPage} from '../pages/full-screen/full-screen';
import {LikelistPage} from '../pages/likelist/likelist';
import {SifremiUnuttumPage} from '../pages/sifremi-unuttum/sifremi-unuttum';
import {ChatPage} from '../pages/chat/chat';
import {SssPage} from '../pages/sss/sss';
import {VideoYuklePage} from '../pages/video-yukle/video-yukle';
import {YorumlarPage} from '../pages/yorumlar/yorumlar';
import { HomePage } from '../pages/home/home';
import {ChatRoomPage} from '../pages/chat-room/chat-room';
import {KayitOlPage} from '../pages/kayit-ol/kayit-ol';
import {PopoverPage} from '../pages/popover/popover';
import {KategoriicerilPage} from '../pages/kategoriiceril/kategoriiceril';
//#endregion

import { MyApp } from './app.component';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { VeritabaniProvider } from '../providers/veritabani/veritabani';

const config: SocketIoConfig = {url: 'http://165.22.77.175:3001',options:{} };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BioDuzenlePage,
    HabericerikPage,
    HaberlerPage,
    CikisPage,
    PopupModalPage,
    HaftaninBirincileriPage,
    KategoriicerilPage,
    HakkindaPage,
    FullScreenPage,
    KategorilerPage,
    VideoYukleicerikPage,
    PopoverPage,
    MpCommentPage,
    LoginPage,
    KayitOlPage,
    PresimonizlePage,
    ChatRoomPage,
    PResimYuklePage,
    LikelistPage,
    ProfilPage,
    MuzikAraPage,
    ReklamPage,
    SifremiUnuttumPage,
    ChatPage,
    SssPage,
    VideoYuklePage,
    YorumlarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicSimpleProgressBarModule.forRoot(),
    IonicStorageModule.forRoot(),
    SocketIoModule.forRoot(config),
    HttpModule,
    ComponentsModule,
    DirectivesModule,
    ProgressBarModule,
    LottieAnimationViewModule.forRoot()
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BioDuzenlePage,
    MpCommentPage,
    CikisPage,
    HabericerikPage,
    FullScreenPage,
    HaberlerPage,
    PresimonizlePage,
    PopupModalPage,
    ChatRoomPage,
    HaftaninBirincileriPage,
    HakkindaPage,
    LikelistPage,
    VideoYukleicerikPage,
    KayitOlPage,
    KategoriicerilPage,
    KategorilerPage,
    PopoverPage,
    MuzikAraPage,
    LoginPage,
    PResimYuklePage,
    ProfilPage,
    ReklamPage,
    SifremiUnuttumPage,
    ChatPage,
    SssPage,
    VideoYuklePage,
    YorumlarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MediaCapture,
    Media,
    File,
    SimpleProgressBarProvider,
    Camera,
    Device, 
    NativeAudio,
    InAppBrowser,
    LocalNotifications,
    NativePageTransitions,
    FileTransfer,
    Network,
    FileTransferObject,
    AdMobFree,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    SQLite,
    VeritabaniProvider
  ]
})
export class AppModule {}
