import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

import {HomePage} from '../home/home';
import {ProfilePage} from '../profile/profile';
import {GetOrcPage} from '../get-orc/get-orc';
import {NotificacaoPage} from '../notificacao/notificacao';

//@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

homePage = HomePage;
profilePage = ProfilePage;
getOrcPage = GetOrcPage;
notificacaoPage = NotificacaoPage;


}
