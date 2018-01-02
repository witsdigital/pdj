import { Component, ViewChild } from '@angular/core';
import { App , ModalController, ActionSheetController, Nav, NavController, LoadingController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import {LoginPage} from '../login/login';
import {UpdatePassPage} from '../update-pass/update-pass';
import {ServiceProvider} from '../../providers/service/service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {TabsPage} from '../tabs/tabs';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
    @ViewChild(Nav) nav: Nav;
dadosUser:any;
tabBarElement:any;
solics:any;
countpend:any;
rate:any;
orcs:any;
accepts:any;
base64Image:any;
imglist:any=[];
dadosimg:any= {};

  constructor(public actionSheetCtrl: ActionSheetController,private camera: Camera, public service: ServiceProvider, public modal: ModalController, public app:  App, public loadingCtrl:LoadingController, private socialSharing: SocialSharing, public navCtrl: NavController, public navParams: NavParams) {
    if(localStorage.getItem('bd_servico')){
       this.navCtrl.push(TabsPage);

    }

 this.tabBarElement = document.querySelector('#tabs ion-tabbar-section');
    if(localStorage.getItem('bd_servico')){
      this.dadosUser = JSON.parse(localStorage.getItem('bd_servico'));

    }
    this.service.getMedia(this.dadosUser[0].id_usuario).subscribe(data=>{

      this.rate = data[0].media;

    });


    this.getSol();
    this.getOrc();
    this.getaccept();
  }
  share(){
    this.socialSharing.share("Precisando de um profissional pra te dar uma forcinha? Baixe agora o aplicativo ServiçoStore",null/*Subject*/,null/*File*/,"http://servico.store")

    .then(() => {
  // Sharing via email is possible
}).catch(() => {
  // Sharing via email is not possible
});
  }
onModelChange(d){
}
  ionViewDidLoad() {

  }

  getOrc(){


    this.service.getOrc(this.dadosUser[0].id_usuario).subscribe((data)=>{
      this.orcs = data.length;
console.log(this.orcs);
    },(erro)=>{
      console.log(erro);
    });

  }


  editarimg() {
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
        targetWidth: 500,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType:this.camera.MediaType.PICTURE,
        sourceType: type == "picture" ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        correctOrientation: true,

      };

  this.camera.getPicture(options).then((imageData) => {
   // imageData is either a base64 encoded string or a file URI
   // If it's base64:
  this.base64Image = 'data:image/jpeg;base64,' + imageData;
  this.imglist.push(this.base64Image );
  }, (err) => {
   // Handle error
  });
this.dadosimg.user = this.dadosUser[0].id_usuario;
this.dadosimg.img = this.base64Image;

this.service.upFoto(this.dadosimg).then((data)=>{
    this.base64Image = '';
    this.dadosimg = {};

});

    }


  getaccept(){
    this.service.getpp(this.dadosUser[0].id_usuario).subscribe((data)=>{
      this.accepts = data.length;
console.log(  this.accepts);
    },(erro)=>{
      console.log(erro);
    });

  }



  exit(){
    let loader = this.loadingCtrl.create({
      content: "Aguarde...",
      duration: 6000
    });
    loader.present();
    localStorage.removeItem('bd_servico');
       loader.dismiss();
  this.app.getRootNav().setRoot(LoginPage);

  }


  sair(){
    localStorage.removeItem('bd_servico');


  }

  getSol(){

    this.service.getSol(this.dadosUser[0].id_usuario).subscribe((data)=>{
      this.solics = data;
      this.countpend = this.solics.length;

    },(erro)=>{
    });


  }
  updatePass(){
    let modal = this.modal.create(UpdatePassPage);
    modal.present();
  }

}
