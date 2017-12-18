import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ToastController } from 'ionic-angular';

/**
 * Generated class for the CartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  carttemp:any = [];
    cart:any = [];
    totalcompra:any = 0;
    statusvalor:any;

  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams,  public viewCtrl: ViewController) {
    this.carttemp = navParams.get('dadosCart');//recupera dados inseridos o carrinho
console.log(this.carttemp);

  }

  rmqtd(item){
    let index = this.carttemp.indexOf(item);
    if(  this.carttemp[index].qtd == 0){
      let toast = this.toastCtrl.create({
        message: 'Não é possível valor negativo',
        duration: 3000
      });
      toast.present();

    }else{
        this.carttemp[index].qtd --;

    }

      this.getTotalCompra();

  }
  addqtd(item){
    let index2 = this.carttemp.indexOf(item);
    this.carttemp[index2].qtd++;
        this.getTotalCompra();

  }

  close(){
    this.cart = this.carttemp;
    this.viewCtrl.dismiss(this.cart);
  }

  getTotalCompra(){
    this.statusvalor = false;
    this.totalcompra = 0;
    for(let i = 0; i<=this.carttemp.length-1; i++){
      this.totalcompra = parseInt(this.totalcompra)+parseInt(this.carttemp[i].price)*parseInt(this.carttemp[i].qtd);

    }
      this.statusvalor = true;
  }
  rmcart(item){

    let index = this.carttemp.indexOf(item);
    this.carttemp.splice(index, 1);
    this.getTotalCompra();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

}
