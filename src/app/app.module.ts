import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServiceProvider } from '../providers/service/service';
import { LocalProvider } from '../providers/local/local';
import {TabsPage} from '../pages/tabs/tabs';
import {ServicosPage} from '../pages/servicos/servicos';
import {OrcamentoPage} from '../pages/orcamento/orcamento';
import {LoginPage} from '../pages/login/login';
import {CadUserPage} from '../pages/cad-user/cad-user';
import {RecPassPage} from '../pages/rec-pass/rec-pass';
import {ProfilePage} from '../pages/profile/profile';
import {GetOrcPage} from '../pages/get-orc/get-orc';
import {ViewOrcsPage} from '../pages/view-orcs/view-orcs';
import {ViewOrcPage} from '../pages/view-orc/view-orc';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Network } from '@ionic-native/network';
import { NotificacaoPage} from '../pages/notificacao/notificacao';
import {UpdatePassPage} from '../pages/update-pass/update-pass';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { OneSignal } from '@ionic-native/onesignal';
import { CallNumber } from '@ionic-native/call-number';
import {LocalizacaoPage} from '../pages/localizacao/localizacao';
import {ProfFornPage} from '../pages/prof-forn/prof-forn';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Ionic2RatingModule } from 'ionic2-rating';
import {AvaliacaoPage} from '../pages/avaliacao/avaliacao';
import { IonicImageLoader } from 'ionic-image-loader';
import {IndiquePage} from '../pages/indique/indique';
import { Ng2OrderModule } from 'ng2-order-pipe';
import {PreloginPage} from '../pages/prelogin/prelogin';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';


@NgModule({
  declarations: [
    PreloginPage,
    IndiquePage,
    AvaliacaoPage,
    ProfFornPage,
    UpdatePassPage,
    LocalizacaoPage,

NotificacaoPage,
    CadUserPage,
    MyApp,
    TabsPage,
    HomePage,
    ListPage,
    ServicosPage,
    OrcamentoPage,
    LoginPage,
    RecPassPage,
    ProfilePage,
    GetOrcPage,
    ViewOrcsPage,
    ViewOrcPage
  ],
  imports: [
    Ng2OrderModule,

    Ionic2RatingModule,
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
        IonicImageLoader.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    PreloginPage,
    IndiquePage,
    AvaliacaoPage,
    LocalizacaoPage,
    ProfFornPage,
    UpdatePassPage,
    NotificacaoPage,
    MyApp,
    HomePage,
    CadUserPage,
    ListPage,
    TabsPage,
    ServicosPage,
    OrcamentoPage,
    LoginPage,
    RecPassPage,
    ProfilePage,
    GetOrcPage,
    ViewOrcsPage,
    ViewOrcPage
  ],
  providers: [
FileTransfer,

    Camera,
    Geolocation,
    CallNumber,
    OneSignal,
LocalNotifications,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider,
    SocialSharing,
Network,
    ServiceProvider,
    LocalProvider
  ]
})
export class AppModule {}
