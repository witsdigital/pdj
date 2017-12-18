import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import {ServiceProvider} from '../../providers/service/service';
/**
 * Generated class for the AvaliacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-avaliacao',
  templateUrl: 'avaliacao.html',
})
export class AvaliacaoPage {
  item:any;
  rate:any;

  constructor(public toastCtrl: ToastController, public viewCtrl: ViewController, public service: ServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get('item');
    console.log(this.item);
  }

  ionViewDidLoad() {

  }

  onModelChange(d){
    console.log(this.rate);

  }
  avaliar(){
          this.item.nota = this.rate;
            this.service.postAvaliacao(this.item).then(data=>{
              this.viewCtrl.dismiss();
            });



  }
  close(){
        this.viewCtrl.dismiss();
  }

}
