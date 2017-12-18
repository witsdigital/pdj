import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { OneSignal } from '@ionic-native/onesignal';
import {TabsPage} from '../pages/tabs/tabs';
import {LocalizacaoPage} from '../pages/localizacao/localizacao';
import {LoginPage} from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') navCtrl: NavController;

  dadosUser:any=[];

  @ViewChild(Nav) nav: Nav;

//  rootPage: any = LocalizacaoPage;
  rootPage: any = LoginPage;
//  rootPage: any = TabsPage;

  pages: Array<{title: string, icon: string, component: any}>;

  constructor(private oneSignal: OneSignal, private localNotifications: LocalNotifications,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
/*

    setInterval(() => {

     this.localNotifications.schedule({
   id: 1,
   title: 'Local ILocalNotification Example',
     text: 'Multi ILocalNotification 2',
     icon: 'http://example.com/icon.png',
   sound:'file://sound.mp3'
 });


    }, 10000);*/

    if(localStorage.getItem('userData')){
      this.dadosUser = JSON.parse(localStorage.getItem('userData'));
      console.log(this.dadosUser[0].nome);

    }else{
        this.dadosUser.push( {nome:'thiago', email:'t@email.com'});
    }
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home',icon:'home', component: TabsPage },


    ];

  }

  sair(){
    localStorage.removeItem('userData');
       this.nav.setRoot(LoginPage);
  }

  initializeApp() {
    this.platform.ready().then(() => {
    this.statusBar.styleDefault();
    this.splashScreen.hide();

    // OneSignal Code start:
    // Enable to debug issues:
    // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

    if (this.platform.is('cordova')) {

       this.oneSignal.startInit('1bd94b2f-6de1-44ee-a3cf-a85b42657e03', '41894719047');

      this.oneSignal.getIds().then((data)=>{
               localStorage.setItem('pushkey', JSON.stringify(data));
     console.log(data.userId);
   });

   this.oneSignal.endInit();
   } else {



   }




  });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
