
import { PostsProvider } from './../../providers/posts/posts';
import { Component,Input,Output,EventEmitter } from '@angular/core'
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';


import { Post } from './../../app/models/post';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
  local:String = JSON.parse(localStorage.getItem("token")).idUsuario;
  edit:boolean = false;
  isDono:boolean = false;
  nome:String;
  postUid:String;
  @Input() post:Post;
  @Output() postClicado = new EventEmitter<Post>();

  constructor(public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams, public postProvider:PostsProvider) {
  }

  removerPost(){
        this.postClicado.emit(this.post);
  }

  ionViewDidLoad() {
      //retorna usario do post passado
      
  }

 editarPost(){
    console.log(this.post)
    this.postProvider.editarPost(this.post).subscribe(
      data=>{
        console.log(data)
      },
      error=>{
        console.log(error)
      }
    )
    this.edit=true;
  }
  likePost(){
    
    this.postProvider.realizarLike(this.post).subscribe(
      data=>{
        //recebe 1 se ele ainda não curtiu 
        //recebe -1 se ele já curtiu e decrementa 1
        var lk = JSON.parse(data._body);                
        this.post.likes += lk.like;       
      },
      error=>{
        console.log(error)
      }
    )
  }
  getUser(idPost){
    if(idPost === this.local){
      return true;    
    }else
      return false;
    
  }
  formatData(data){
    var dataFormatada = new Date(data);
    return dataFormatada;
  }
    exibirComentarios(){
       var toast = this.toastCtrl.create({
              message:"Comentarios ainda não implementado",
              duration:3000,
              position: "middle"
            });
            toast.present();
    }
}
