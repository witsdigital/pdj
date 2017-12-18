import { Component } from '@angular/core';
import {  NavController, NavParams,ModalController,LoadingController } from 'ionic-angular';
import {ServiceProvider} from '../../providers/service/service';
import {ViewOrcPage} from '../view-orc/view-orc';
import {ProfFornPage} from '../prof-forn/prof-forn';

/**
 * Generated class for the ViewOrcsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-view-orcs',
  templateUrl: 'view-orcs.html',
})
export class ViewOrcsPage {
  itens:any;
  dadosUser:any;
  orcs:any;

  constructor(public loadingCtrl: LoadingController, public modalCtrl: ModalController, public service: ServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    let loader = this.loadingCtrl.create({
      content: "Aguarde...",
      duration: 10000
    });
    loader.present();
    console.log(navParams.get('item'));
        this.dadosUser = JSON.parse(localStorage.getItem('bd_servico'));
  this.service.getOrcs(navParams.get('item')).subscribe((data)=>{
      this.orcs = data;
    loader.dismiss();
    },(erro)=>{
    loader.dismiss();
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewOrcsPage');
  }

  viewOrc(item){
    let modal = this.modalCtrl.create(ViewOrcPage, {item: item});
    modal.onDidDismiss(data => {
      if(data==null){
          console.log(data);

           }else{
           this.navCtrl.push(ProfFornPage,{fn:data});

           }






    });
    modal.present();
  }

}
