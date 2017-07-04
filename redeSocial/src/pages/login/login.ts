import { SignPage } from './../sign/sign';
import { TimeLinePage } from './../time-line/time-line';
import { LoginProvider } from './../../providers/login/login';
import { Component,ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild('myNav') nav: NavController

  email:String;
  senha:String;
  token:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loginProvider:LoginProvider) {
    
 }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad LoginPage');
  }
 
  requestLogin(){
    
    //essa função solicita uma requisição de login
    //caso for aceita, recebe um token gerado pelo servidor
    this.loginProvider.requestLogin({
      email:this.email,
      senha:this.senha
    })
    .subscribe(data => {
      if (data) {
        console.log("t1")   
           this.logar(data);
        
      } else {
        console.log("t2")   
        this.error("Access Denied");
      }
    },
      error => {
        console.log("t3")   
        this.error(error);
      });
   
   } 
   logar(data){
      if(data){  
         this.saveStorage(data)
        }
   }
   error(error){
          console.log(error);          
        
   }
   saveStorage(token){
      localStorage.setItem("token",JSON.stringify(token)); 
      this.navCtrl.setRoot(TimeLinePage,{
        idUsuario:token.idUsuario
      });
   }
   sigin(){
     this.navCtrl.push(SignPage);
   }
   
}

