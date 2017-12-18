import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, ToastController, NavParams, ViewController } from 'ionic-angular';
import {ServiceProvider} from '../../providers/service/service';

@Component({
  selector: 'page-indique',
  templateUrl: 'indique.html',
})
export class IndiquePage {
  cadastro:any={};
  mensage:any;

  constructor(public toastCtrl:ToastController, public loadingCtrl: LoadingController,public service: ServiceProvider,public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  }



  close(){
    this.viewCtrl.dismiss();
  }
  salvar(item){
    let loader = this.loadingCtrl.create({
      content: "Aguarde...",
      duration: 6000
    });
    loader.present();
    this.service.indique(item).then(data=>{
      this.mensage = data;
  if(this.mensage.mensage==1){
    loader.dismiss();
    let toast = this.toastCtrl.create({
      message: 'Indicação enviada com sucesso!',
      duration: 3000,
      position: 'botton',
   cssClass: "toast-success"
    });
    toast.present();
          this.viewCtrl.dismiss();

  }else{
    let toast = this.toastCtrl.create({
      message: 'Erro ao enviar, tente mais tarde!',
      duration: 3000,
      position: 'botton',
   cssClass: "toast-error"
    });
    toast.present();

  }

    });


  }

}
