import { Component } from '@angular/core';
import {  NavController, LoadingController, NavParams,ToastController,ViewController } from 'ionic-angular';
import {ServiceProvider} from '../../providers/service/service';

import {LoginPage} from '../login/login';
/**
 * Generated class for the RecPassPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-rec-pass',
  templateUrl: 'rec-pass.html',
})
export class RecPassPage {
  cadastro:any = {};
  mensage:any;
  constructor(public loadingCtrl : LoadingController, public navCtrl: NavController,public viewCtrl: ViewController, public navParams: NavParams,public toastCtrl:ToastController, public service:ServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecPassPage');
  }
  salvar(c){
    let loader = this.loadingCtrl.create({
      content: "Aguarde...",
      duration: 6000
    });
    loader.present();


    this.service.postPass(c).then((result)=>{
this.mensage = result;
if(this.mensage.mensage==1){

  let toast = this.toastCtrl.create({
    message: 'Sucesso: Confira sua caixa de mensagem',
    duration: 3000,
    position: 'top',
 cssClass: "toast-success"
  });
  toast.present();
      loader.dismiss();
   this.navCtrl.push(LoginPage);


}else{
  let toast = this.toastCtrl.create({
    message: 'Erro: Não há email correspondente ',
    duration: 3000,
    position: 'top',
 cssClass: "toast-error"
  });
  toast.present();
      loader.dismiss();

}

    }, (error)=>{
      console.log(error);

    });


  }

  close(){
    this.viewCtrl.dismiss();
  }

}
