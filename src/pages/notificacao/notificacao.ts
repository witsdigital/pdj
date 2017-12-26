import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ServiceProvider} from '../../providers/service/service';

/**
 * Generated class for the NotificacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-notificacao',
  templateUrl: 'notificacao.html',
})
export class NotificacaoPage {
  dadosUser:any;
  dados:any;

  constructor(public service: ServiceProvider, public navCtrl: NavController, public navParams: NavParams) {

    if(localStorage.getItem('bd_servico')){
      this.dadosUser = JSON.parse(localStorage.getItem('bd_servico'));

    }
    this.getNot();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificacaoPage');
  }
  doRefresh(refresher) {
this.getNot();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  getNot(){

    this.service.getNotByUser(this.dadosUser[0].id_usuario).subscribe((data)=>{
      this.dados = data;
      console.log(data);
    });

  }

}
