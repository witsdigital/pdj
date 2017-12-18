import { Component } from '@angular/core';
import { ToastController, NavController, NavParams,ViewController, LoadingController } from 'ionic-angular';
import {ServiceProvider} from '../../providers/service/service';
import {TabsPage} from '../tabs/tabs';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';

/**
 * Generated class for the OrcamentoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-orcamento',
  templateUrl: 'orcamento.html',
})
export class OrcamentoPage {

  ct:any;
  cadastro:any= [];
  endenew:any= [];
  dadosUser:any;
  mensage:any;
  base64Image:any;
  imglist:any=[];

  constructor(public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController, private camera: Camera, public navCtrl: NavController,public toastCtrl:ToastController, public service : ServiceProvider, public navParams: NavParams, public viewCtrl: ViewController) {
    this.ct = this.navParams.get('ct');
  }



  presentActionSheet() {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Origem da sua foto',
        buttons: [
          {
            text: 'Galeria',

            handler: () => {
            this.addfoto('gallery');
            }
          },{
            text: 'Câmera',
            handler: () => {
      this.addfoto('picture');
            }
          },{
            text: 'Cancel',
            role: 'cancel',
            handler: () => {

            }
          }
        ]
      });
      actionSheet.present();
    }





  addfoto(type){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE,
      sourceType: type == "picture" ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      correctOrientation: true
    };

this.camera.getPicture(options).then((imageData) => {
 // imageData is either a base64 encoded string or a file URI
 // If it's base64:
this.base64Image = 'data:image/jpeg;base64,' + imageData;
this.imglist.push(this.base64Image );
}, (err) => {
 // Handle error
});
  }
  closePhoto(item){
  let index = this.imglist.indexOf(item);// pega o indice a ser removido
this.imglist.splice(index, 1); // remove o item do determinado indice

}

  ionViewDidLoad() {
  }
  cadOrc(dados){
    let loader = this.loadingCtrl.create({
      content: "Guenta aí...",
      duration: 10000
    });
    loader.present();
    this.dadosUser = JSON.parse(localStorage.getItem('bd_servico'));
    this.ct.id_usuario=this.dadosUser[0].id_usuario;

    this.ct.descricao = dados.descricao;
    this.ct.dataexecut = dados.dataexecut;
this.ct.imgs = this.imglist;
this.service.postOrc(this.ct).then((result)=>{
  console.log(result);
  this.mensage = result;
  if(this.mensage.mensage == 1){
    let toast = this.toastCtrl.create({
      message: 'Orçamento solicitado com sucesso',
      duration: 3000,
      position: 'bottom',
   cssClass: "toast-success"
    });
      loader.dismiss();
    toast.present();

       this.navCtrl.setRoot(TabsPage);


  }else{
    let toast = this.toastCtrl.create({
      message: 'Error',
      duration: 3000,
      position: 'top',
   cssClass: "toast-error"
    });
    toast.present();
  }
},(error)=>{

});

  }
  close(){
    this.viewCtrl.dismiss();
  }

}
