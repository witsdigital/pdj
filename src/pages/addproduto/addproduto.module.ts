import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddprodutoPage } from './addproduto';

@NgModule({
  declarations: [
    AddprodutoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddprodutoPage),
  ],
  exports: [
    AddprodutoPage
  ]
})
export class AddprodutoPageModule {}
