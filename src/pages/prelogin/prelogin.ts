import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {CadUserPage} from '../cad-user/cad-user';
import {LoginPage} from '../login/login';
import {TabsPage} from '../tabs/tabs';
/**
 * Generated class for the PreloginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-prelogin',
  templateUrl: 'prelogin.html',
})
export class PreloginPage {

  constructor(public modalCtrl:ModalController, public navCtrl: NavController, public navParams: NavParams) {
    if(localStorage.getItem('bd_servico')){
       this.navCtrl.push(TabsPage);

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreloginPage');
  }

  cadUser(){
    let modal = this.modalCtrl.create(CadUserPage);
    modal.onDidDismiss(data => {


    });
    modal.present();
  }
  login(){
       this.navCtrl.push(LoginPage);
  }

}
