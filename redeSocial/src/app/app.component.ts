import { LoginProvider } from './../providers/login/login';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { TimeLinePage } from '../pages/time-line/time-line';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') nav: Nav;

  rootPage:any;
  // pages:[{titulo:string,componente:any}];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public loginProvider:LoginProvider) {
    platform.ready().then(() => {
    //   this.pages = [{
    //   titulo: 'TimeLine',
    //   componente: TimeLinePage
    // },{
    //   titulo: 'Login',
    //   componente: LoginPage
    // }]
    if(this.loginProvider.tokenExist() && this.loginProvider.valideToken()){
            this.rootPage = TimeLinePage;
    }else{
      this.rootPage = LoginPage;
    }


      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
