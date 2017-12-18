import { Component } from '@angular/core';
import {  NavController, LoadingController, NavParams, ToastController,ModalController  } from 'ionic-angular';
import {ServiceProvider} from '../../providers/service/service';
import { Http } from '@angular/http';
import {TabsPage} from '../tabs/tabs';
import {CadUserPage} from '../cad-user/cad-user';
import {RecPassPage} from '../rec-pass/rec-pass';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  logar:any=[];
  data:any = {};
  dados:any;

  responseData : any;
  userData:any = {};

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public toastCtrl:ToastController, public service: ServiceProvider,public http: Http,public modalCtrl: ModalController ) {
if(localStorage.getItem('bd_servico')){
   this.navCtrl.push(TabsPage);

}


  }


  cadUser(){
    let modal = this.modalCtrl.create(CadUserPage);
    modal.onDidDismiss(data => {


    });
    modal.present();
  }


  recSenha(){

    let modal = this.modalCtrl.create(RecPassPage);
    modal.onDidDismiss(data => {


    });
    modal.present();
  }







  lg(dados){
    let loader = this.loadingCtrl.create({
      content: "Aguarde...",
      duration: 6000
    });
    loader.present();



    if(!dados.login || !dados.senha){
      let toast = this.toastCtrl.create({
        message: 'Preencha os campos corretamente',
        duration: 3000,
        position: 'top',
     cssClass: "toast-error"
      });
        loader.dismiss();
      toast.present();
    }else{
        this.service.postDatas(this.userData,'signup').then((result) => {
         this.responseData = result;
         console.log(this.responseData[0].permissao);
         if(this.responseData[0].permissao==0){
           let toast = this.toastCtrl.create({
             message: 'Login/Senha inválido',
             duration: 3000,
             position: 'top',
          cssClass: "toast-error"
           });
             loader.dismiss();
           toast.present();

         }else{
           localStorage.setItem('bd_servico', JSON.stringify(this.responseData));
           this.navCtrl.setRoot(TabsPage);
           let toast = this.toastCtrl.create({
             message: 'Bem-Vindo',
             duration: 3000,
             position: 'top',
          cssClass: "toast-success"
           });
             loader.dismiss();
           toast.present();

         }


       }, (err) => {
         // Error log
       });



    }


    console.log(dados);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
