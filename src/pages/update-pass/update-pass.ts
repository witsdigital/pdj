import { Component } from '@angular/core';
import { IonicPage, LoadingController, ToastController, ViewController, NavController, NavParams } from 'ionic-angular';
import {ServiceProvider} from '../../providers/service/service';
/**
 * Generated class for the UpdatePassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-update-pass',
  templateUrl: 'update-pass.html',
})
export class UpdatePassPage {
  cadastro:any = {};
dadosUser:any;

  constructor(public loadingCtrl: LoadingController, public t: ToastController, public service : ServiceProvider,  public navCtrl: NavController, public view :ViewController,  public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatePassPage');

  }
  close(){
    this.view.dismiss();
  }
salvar(dados:any){
  let loader = this.loadingCtrl.create({
    content: "Aguarde...",
    duration: 6000
  });
  loader.present();


  this.dadosUser = JSON.parse(localStorage.getItem('bd_servico'));
dados.user = this.dadosUser[0].id_usuario;

  if(dados.confirma == dados.nova){
    this.service.upPass(dados).then((data)=>{
  if(data['mensage'] == 1){
    let toast = this.t.create({
      message: 'Senha alterada com sucesso',
      duration: 3000,
      position: 'top',
   cssClass: "toast-success"
    });

    toast.present();
    loader.dismiss();
            this.view.dismiss();


  }
  if(data['mensage'] == 2){
    let toast = this.t.create({
      message: 'Senha não compativel',
      duration: 3000,
      position: 'top',
   cssClass: "toast-error"
    });
loader.dismiss();
    toast.present();

  }
  if(data['mensage'] == 3){
    let toast = this.t.create({
      message: 'Ops, tente novamente mais tarde',
      duration: 3000,
      position: 'top',
   cssClass: "toast-error"
    });
loader.dismiss();
    toast.present();

  }
    },(err)=>{

    });

  }else{
    let toast = this.t.create({
      message: 'Senhas diferentes',
      duration: 3000,
      position: 'top',
   cssClass: "toast-error"
    });
loader.dismiss();
    toast.present();
  }


}



}
