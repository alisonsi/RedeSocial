import { TimeLinePage } from './../time-line/time-line';
import { LoginProvider } from './../../providers/login/login';
import { SiginProvider } from './../../providers/sigin/sigin';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SignPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sign',
  templateUrl: 'sign.html',
})
export class SignPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public signProvider:SiginProvider, public loginProvider:LoginProvider) {
  }
    nome:String;
    email:String;
    senha:String;
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignPage');
  }
  sigin(){
   
    this.signProvider.requestSigin({
      nome:this.nome,
      email:this.email,
      senha:this.senha
    }).subscribe(data => {
      if (data) {   
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
  }


