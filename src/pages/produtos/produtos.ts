import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {CadProdutoPage} from '../cad-produto/cad-produto';

import {ServiceProvider} from '../../providers/service/service';
@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {
  prod:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public service:ServiceProvider, public modalCtrl: ModalController ) {
    this.getDados();
  }

  add(){
    let modal = this.modalCtrl.create(CadProdutoPage);
    modal.onDidDismiss(data => {

    });
    modal.present();
  }

  getDados(){
    this.service.getProdutos().subscribe(
      (data)=>{
        this.prod = data;
        console.log(data);

      },
      err=>{
        console.log(err);

      }
    );
  }





  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdutosPage');
  }

}
