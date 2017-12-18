import { Component } from '@angular/core';
import {  NavController, NavParams,ViewController,ToastController } from 'ionic-angular';
import {ServiceProvider} from '../../providers/service/service';
import {LoginPage} from '../login/login';
/**
 * Generated class for the CadUserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-cad-user',
  templateUrl: 'cad-user.html',
})
export class CadUserPage {


  cadastro:any = {};
  cidades:any;
  mensage:any;
dadospush:any;

  constructor( public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController,public viewCtrl: ViewController, public service: ServiceProvider) {

    this.service.getCidades().subscribe((data)=>{
      this.cidades = data;
      console.log(  this.cidades[0]);
    }, (error)=>{
      console.log(error);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadUserPage');
  }
  close(){
    this.viewCtrl.dismiss();
  }
  salvar(cad:any){
    this.dadospush = JSON.parse(localStorage.getItem('pushkey'));
      cad.userid = this.dadospush.userId;
          console.log( cad);
    this.service.postCadUser(cad,'2').then((result)=>{
      console.log(result);
this.mensage = result;
if(this.mensage.mensage==1){

  let toast = this.toastCtrl.create({
    message: 'Login já esta em uso',
    duration: 3000,
    position: 'top',
 cssClass: "toast-error"
  });
  toast.present();

}
if(this.mensage.mensage==2){

  let toast = this.toastCtrl.create({
    message: 'CPF já esta em uso',
    duration: 3000,
    position: 'top',
 cssClass: "toast-error"
  });
  toast.present();

}
if(this.mensage.mensage==3){

  let toast = this.toastCtrl.create({
    message: 'Cadastro Realizado com sucesso',
    duration: 3000,
    position: 'top',
 cssClass: "toast-success"
  });
  toast.present();
       this.navCtrl.push(LoginPage);

}

    },(err)=>{
      console.log(err);
    });


  }

}
