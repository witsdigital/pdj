import { Component  } from '@angular/core';
import { NavController,LoadingController, ModalController } from 'ionic-angular';
import {OrcamentoPage} from '../orcamento/orcamento';
import {ServicosPage} from '../servicos/servicos';
import {ServiceProvider} from '../../providers/service/service';
import { Network } from '@ionic-native/network';
import { ImgLoader,ImageLoaderConfig } from 'ionic-image-loader';
import { ImageLoader } from 'ionic-image-loader';
import { IndiquePage} from '../indique/indique';






@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

cats : any = [];
dadosUser:any;

    servicos:any = ServicosPage;


destaques:any;
img:any = {src:'assets/slide.jpg'};
tem:any;
homeOptions = {
       initialSlide: 0,
       loop: true,
       autoplay:2000
     };

searchQuery: string = '';
lista:any[];
 items: any[];
 status:any = '';
 noconect:any;


  constructor(public imageLoader: ImageLoader, public imageLoaderConfig: ImageLoaderConfig, public network: Network, public navCtrl: NavController,public modalCtrl: ModalController,public loadingCtrl: LoadingController, public service: ServiceProvider) {
 this.initializeItems();








    if(localStorage.getItem('userData')){
      this.dadosUser = JSON.parse(localStorage.getItem('userData'));


    }





this.getDados();
this.network.onDisconnect().subscribe(() => {

this.status = "desconectado";
});

this.network.onConnect().subscribe(() => {

  this.status = "conectado"
  // We just got a connection but we need to wait briefly
   // before we determine the connection type. Might need to wait.
  // prior to doing any api requests as well.
  setTimeout(() => {
    if (this.network.type === 'wifi') {
      console.log('we got a wifi connection, woohoo!');
    }
  }, 3000);
});



  }
  onImageLoad(imgLoader: ImgLoader) {
    // do something with the loader
  }




  teste(){

    this.network.onDisconnect().subscribe(() => {

    this.status = "desconectado";
    });

    this.network.onConnect().subscribe(() => {

      this.status = "conectado"
      // We just got a connection but we need to wait briefly
       // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {

        }
      }, 3000);
    });
  }


  initializeItems() {

    this.items = this.lista;


 }

 getItems(ev: any) {
    // Reset items back to all of the items

this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.tem = true;
      this.items = this.items.filter((item) => {
        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
          this.tem = false;

    }
  }




  openserv(item){
    let modal = this.modalCtrl.create(OrcamentoPage, {ct: item});
    modal.onDidDismiss(data => {


    });
    modal.present();

  }

getDestaques(){
  this.service.getdestaques().subscribe((data)=>{

    this.destaques = data;
  },(error)=>{

  });
}

  getDados(){

    let loader = this.loadingCtrl.create({
      content: "Carregando...",
      duration: 15000
    });
    loader.present();

    this.service.getCat().subscribe(
      (data)=>{
        this.cats = data;
  this.getDestaques();
  loader.dismiss();



      }
        ,

      (err)=> {console.log(err);
      alert("Ops algo deu errado");
        loader.dismiss();
      this.noconect = true;
    }
    );
    this.service.getServicos().subscribe((data)=>{

 this.lista = data;
 this.items = this.lista;
    },(err)=>{

    });

  }

  animateElem(page: any, dados: any) {

 this.navCtrl.push(page, { cat: dados });

  // ;
  }




  onMenu(page: any){
this.navCtrl.setRoot(page);
}
indique(){
  let modal = this.modalCtrl.create(IndiquePage);
  modal.onDidDismiss(data => {


  });
  modal.present();

}
reload(){
  window.location.reload();

}



}
