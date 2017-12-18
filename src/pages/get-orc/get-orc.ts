import { Component } from '@angular/core';
import {  NavController, ModalController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import {ServiceProvider} from '../../providers/service/service';
import{ViewOrcsPage} from '../view-orcs/view-orcs';
import {ProfFornPage} from '../prof-forn/prof-forn';
@Component({
  selector: 'page-get-orc',
  templateUrl: 'get-orc.html',
})
export class GetOrcPage {
  orcs:any;
  solics:any;
  accepts:any;
  rate:any;

dadosUser:any;

  constructor(public toastCtrl: ToastController, public loadingCtrl: LoadingController, public modalCtrl:ModalController, public service : ServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.dadosUser = JSON.parse(localStorage.getItem('bd_servico'));
    console.log(this.dadosUser[0].nome);
    this.rate = 4;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GetOrcPage');
  }
  getOrc(){
    let loader = this.loadingCtrl.create({
      content: "Aguarde...",
      duration: 10000
    });
    loader.present();

    this.service.getOrc(this.dadosUser[0].id_usuario).subscribe((data)=>{
      this.orcs = data;
          loader.dismiss();
console.log(data);
    },(erro)=>{
      console.log(erro);
    });

  }
  getSol(){
    let loader = this.loadingCtrl.create({
      content: "Aguarde...",
      duration: 10000
    });
    loader.present();

    this.service.getSol(this.dadosUser[0].id_usuario).subscribe((data)=>{
      this.solics = data;
      loader.dismiss();
console.log(data);
    },(erro)=>{
      console.log(erro);
    });


  }

  getaccept(){
    let loader = this.loadingCtrl.create({
      content: "Aguarde...",
      duration: 10000
    });
    loader.present();
    this.service.getpp(this.dadosUser[0].id_usuario).subscribe((data)=>{
      this.accepts = data;
          loader.dismiss();
console.log(data);
    },(erro)=>{
      console.log(erro);
    });

  }
  openP(item){
    let modal = this.modalCtrl.create(ProfFornPage,{ fn: item });
    modal.onDidDismiss(data => {


    });
    modal.present();


  }
  openOrc(item){
this.service.getAceitos(item).subscribe(data=>{
  console.log(data);
  if(data.mensage==1){
    let toast = this.toastCtrl.create({
      message: 'Orçamento Já aceito, caso precise de um novo faça uma nova solicitação',
      duration: 5000,
      position: 'top',
   cssClass: "toast-error"
    });

    toast.present();

  }else{
    this.navCtrl.push(ViewOrcsPage,  {item: item});
  }
});
  }


}
