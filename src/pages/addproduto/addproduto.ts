import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ServiceProvider} from '../../providers/service/service';
import { ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
/**
* Generated class for the AddprodutoPage page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-addproduto',
  templateUrl: 'addproduto.html',
})
export class AddprodutoPage {
  produtos:any = [];
  dados:any=[];
  items: any[];
  cart: any=[];
  carttemp: any=[];
  produtcart:any = [];
  statusvalor:boolean = true;

  ispd:boolean = false;
  totalcompra:any = 0;


  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public service :ServiceProvider, public navParams: NavParams,  public viewCtrl: ViewController) {
    this.dados.qtd = 1;
    this.getdados();
    this.cart = navParams.get('dadosCart');//recupera dados inseridos o carrinho
    if(navParams.get('dadosCart')){
      this.carttemp = navParams.get('dadosCart');
    }
    this.dados.qtd = 1;
      this.getTotalCompra();
  }

  getdados(){
    this.service.getProdutos().subscribe(
      (data)=>{
        this.produtos = data;

        this.items = this.produtos;


      },
      (err) => {
        console.log(err)

      }
    );
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

  getItems(ev: any) {

    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);

      })
      this.ispd = true;
    }else{
      this.ispd = false;
    }
  }

  initializeItems() {

    this.items = this.produtos;
    console.log(this.items);
  }
  verificaCart(pd){
    for(let i = 0; i <= this.carttemp.length-1; i++){
      if(this.carttemp[i].id == pd){
        return true;
      }

    }
    return false;
  }
  addcart(qt,item){
    item.qtd = qt;
    console.log(item);
    this.produtcart.push(item);
    console.log(this.produtcart);
    delete this.cart;
  }


  getTotalCompra(){
    this.statusvalor = false;
    this.totalcompra = 0;
    for(let i = 0; i<=this.carttemp.length-1; i++){
      this.totalcompra = parseInt(this.totalcompra)+parseInt(this.carttemp[i].price)*parseInt(this.carttemp[i].qtd);

    }
      this.statusvalor = true;
  }

  itemSelected(item){

    if(this.carttemp.length>0){
      console.log(item.id);
      if(  this.verificaCart(item.id)){
        let toast = this.toastCtrl.create({
          message: 'Produto já esta no carrinho',
          duration: 3000
        });
        toast.present();

      }else{
        this.carttemp.push(item);
      }


    }else{
      this.carttemp.push(item);
    }




    console.log(this.totalcompra);

    //this.viewCtrl.dismiss(item);
    delete this.items;
    this.getTotalCompra();


  }
  confirma(){
    this.cart = this.carttemp;
    this.viewCtrl.dismiss(this.cart);
  }
  close(){

    this.viewCtrl.dismiss(  this.cart);
  }


  rmcart(item){

    let index = this.carttemp.indexOf(item);
    this.carttemp.splice(index, 1);
    this.getTotalCompra();

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddprodutoPage');
  }

}
