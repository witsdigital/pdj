import { Component } from '@angular/core';
import {  NavController,LoadingController, NavParams, ModalController } from 'ionic-angular';
import {ServiceProvider} from '../../providers/service/service';
import {OrcamentoPage} from '../orcamento/orcamento';

/**
 * Generated class for the ServicosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-servicos',
  templateUrl: 'servicos.html',
})
export class ServicosPage {
  cat:any;
  cats:any;
  totalcats:any;
  totalprestador:any;


  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, public service: ServiceProvider, public navParams: NavParams, public modalCtrl: ModalController) {
    let loader = this.loadingCtrl.create({
      content: "Carregando...",
      duration: 3000
    });
    loader.present();

    this.cat = this.navParams.get('cat');
      console.log(this.cat);
      this.getDados();
      this.service.getCountRespByCat(this.cat.id_categoria).subscribe(
        (data)=>{
          this.totalprestador = data;//recebe o total de prestadores daquela categoria
            console.log(data);
          this.totalprestador = this.totalprestador.length;//recebe o total de prestadores daquela categoria
          loader.dismiss();


  }  ,  err=> console.log(err)
      );


  }

  ionViewDidLoad() {
  //  console.log('ionViewDidLoad ServicosPage');
  }

  requestService(item){
    let modal = this.modalCtrl.create(OrcamentoPage, {ct: item});
    modal.onDidDismiss(data => {


    });
    modal.present();



  }

  getDados(){

    this.service.getServByCat(this.cat.id_categoria).subscribe(
      (data)=>{
        this.cats = data;
        this.totalcats = this.cats.length;

  console.log(data);
}  ,  err=> console.log(err)
    );

  }

}
