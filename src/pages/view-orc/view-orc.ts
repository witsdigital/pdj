import { Component } from '@angular/core';
import {  NavController, NavParams, ViewController, ToastController,LoadingController } from 'ionic-angular';
import {ServiceProvider} from '../../providers/service/service';
import {ProfFornPage} from '../prof-forn/prof-forn';




/**
 * Generated class for the ViewOrcPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-view-orc',
  templateUrl: 'view-orc.html',
})

export class ViewOrcPage {
  dadosUser:any;

orc:any;
mensage:any;
  constructor(public loadingCtrl:LoadingController,public toastCtrl: ToastController, public service: ServiceProvider, public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {
    let loader = this.loadingCtrl.create({
      content: "Aguarde...",
      duration: 10000
    });
    loader.present();
    this.orc = this.navParams.get('item');
    console.log(this.orc);
    this.dadosUser = JSON.parse(localStorage.getItem('bd_servico'));
      loader.dismiss();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewOrcPage');
  }
  close(){
    this.viewCtrl.dismiss();
  }
  acc(d){
    d.id_user = this.dadosUser[0].id_usuario;
    this.service.postPedido(d).then((data)=>{

      this.mensage = data;
      if(this.mensage.mensage == 1){
        let toast = this.toastCtrl.create({
          message: 'Orçamento Aceito com sucesso',
          duration: 3000,
          position: 'bottom',
       cssClass: "toast-success"
        });
        toast.present();

             this.viewCtrl.dismiss(d);


      }else{
        let toast = this.toastCtrl.create({
          message: 'Error',
          duration: 3000,
          position: 'top',
       cssClass: "toast-error"
        });
        toast.present();
      }




      console.log(data);
    },(err)=>{
      console.log(err);
    });
  }

}
