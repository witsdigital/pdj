import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, ToastController, ViewController } from 'ionic-angular';
import {ServiceProvider} from '../../providers/service/service';
import { CallNumber } from '@ionic-native/call-number';
import {LocalizacaoPage} from '../localizacao/localizacao';
import {AvaliacaoPage} from '../avaliacao/avaliacao';
import {GetOrcPage} from '../get-orc/get-orc';
/**
 * Generated class for the ProfFornPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-prof-forn',
  templateUrl: 'prof-forn.html',
})
export class ProfFornPage {
dadosUser:any=[];
fn:any;
rate:any;

  constructor(public toastCtrl: ToastController, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public viewCtrl: ViewController, private callNumber: CallNumber,public service: ServiceProvider, public navCtrl: NavController, public navParams: NavParams) {

    let loader = this.loadingCtrl.create({
      content: "Aguarde...",
      duration: 10000
    });
    loader.present();

        this.fn = this.navParams.get('fn');
        this.getdados(this.fn.cod_fornecedor);
        console.log(this.fn);
        this.service.getMedia(this.fn.cod_fornecedor).subscribe(data=>{
              loader.dismiss();
          this.rate = data[0].media;
        }, (error)=>{
          alert('sem net');

        });
        


  }
test(){
    this.viewCtrl.dismiss();
}
  close(){
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfFornPage');
  }
  openMap(item){

    let modal = this.modalCtrl.create(LocalizacaoPage,{ item: item });
    modal.onDidDismiss(data => {


    });
    modal.present();



  }
  cal(d){
    this.callNumber.callNumber(d, true)
  .then(() => console.log('Launched dialer!'))
  .catch(() => console.log('Error launching dialer'));

  }
  ava(item){
    if(item.status_avaliacao==1){
      let toast = this.toastCtrl.create({
        message: 'Pedido já Avaliado',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }else{
      let modal = this.modalCtrl.create(AvaliacaoPage, {item: item});
      modal.onDidDismiss(data => {
         this.navCtrl.setRoot(GetOrcPage);
      });
      modal.present();
    }

  }


  getdados(d){
    this.service.getFornec(d).then((data)=>{

        this.dadosUser = data;

        console.log(this.dadosUser[0]);
        console.log(data);

    },(err)=>{

    });

  }

}
