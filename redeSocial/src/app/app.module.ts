
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';

import { SignPage } from './../pages/sign/sign';
import { LoginPage } from'../pages/login/login';
import { TimeLinePage } from './../pages/time-line/time-line';
import { PostPage } from './../pages/post/post';

import { LoginProvider } from '../providers/login/login';
import { SiginProvider } from '../providers/sigin/sigin';
import { PostsProvider } from '../providers/posts/posts';
import { UsuariosProvider } from '../providers/usuarios/usuarios';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignPage,
    TimeLinePage,
    PostPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignPage,
    TimeLinePage,
    PostPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    SiginProvider,
    PostsProvider,
    UsuariosProvider,
    UsuariosProvider
  ]
})
export class AppModule {}
