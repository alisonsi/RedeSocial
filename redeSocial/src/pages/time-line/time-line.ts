import { UsuariosProvider } from './../../providers/usuarios/usuarios';
import { Post } from './../../app/models/post';
import { LoginPage } from './../login/login';
import { PostsProvider } from './../../providers/posts/posts';


import { Component } from '@angular/core';
import { ToastController, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the TimeLinePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-time-line',
  templateUrl: 'time-line.html'
})
export class TimeLinePage {
  
  post: Post[] = [];
  texto:String;
  nome:String;
  idUsuario:String;
  constructor(public toastCtrl: ToastController, public usuarioProvider:UsuariosProvider, public navCtrl: NavController, public navParams: NavParams, public postProviders:PostsProvider,public usuariosProvider: UsuariosProvider, public alertCtrl:AlertController) {         
}

  ionViewDidLoad() {
    
    var token = JSON.parse(localStorage.getItem("token"));
    this.idUsuario = token.idUsuario;
    console.log(this.idUsuario)

      this.usuariosProvider.getUsuario(this.idUsuario).subscribe(
        //retornar o usuario logado
        data=>{
          if(data){  
            this.nome = data.nome;            
          }
        }
      )

      //retorna uma lista de posts
      this.postProviders.getPosts().subscribe(
      data=>{
        if(data){
          this.post = data;
          
      }
      }
    )
  }
  postar(){
    if(this.texto){

      var token =  localStorage.getItem("token");            
      this.postProviders.postar({texto:this.texto,nomeUser:this.nome},token)
      .subscribe(data => {
        if (data) {
          this.texto = "";
          //colocando o post no array do provider        
          this.post.unshift(data);
        } else {
          console.log("Ocorreu um erro");
        }
      },
        error => {
          console.log(error);
        });
    }else{
      this.toast(
        "Escreva alguma coisa",
        2000,
        "top"
      )
    }

  }
  sair(){
    localStorage.removeItem("token")
    this.navCtrl.setRoot(LoginPage)
  }
 
 removerPostClicado(post){
   
   let confirm = this.alertCtrl.create({
      title: 'Excluir post',
      message: 'Deseja exluír esse post??',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.postProviders.removerPost(post).subscribe(
              data=>{
                if(data){                
                  var indicePost:number = this.post.indexOf(post);
                  this.post.splice(indicePost,1);                
                }
              },
              error=>{
                console.log(error)
              }        
              )
          }
        }
      ]
    });
    confirm.present();
  }
 
   linhaDoTempo(){
      this.toast(
        "Pagina não implementada",
        3000,
        "bottom"
      )
   }
   amigos(){
    this.toast(
      "Pagina não implementada",
      3000,
      "bottom"
      )
   }

toast(message,duration,position){
      
      var toast = this.toastCtrl.create({
              message:message,
              duration:duration,
              position: position
            });
            toast.present();
}
}
