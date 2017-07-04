import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs'

/*
  Generated class for the PostsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PostsProvider {
  url:string = "http://localhost:3000/api/posts";
  
  constructor(public http: Http) {
    console.log('Hello PostsProvider Provider');
  }
  //realizar uma postagem
  postar(dados,token){ 
        var tk = JSON.parse(token);
          return this.http.post(this.url+"/?token="+tk.token,dados).map((response: Response)=>response.json())
        .catch((error:Response)=>Observable.throw(error));
    }
  getPosts(){
    return this.http.get(this.url).map((response: Response)=>response.json())
        .catch((error:Response)=>Observable.throw(error));
  }

   removerPost(post){ 
     let token = localStorage.getItem("token");    
     var tk = JSON.parse(token);     
        return this.http.delete(this.url +"/"+post._id+"?token="+tk.token)
        .map((response: Response)=>response.json)
        .catch((error:Response)=>Observable.throw(error))
    }

    editarPost(post){
      let token = localStorage.getItem("token");    
      var tk = JSON.parse(token);  
        return this.http.put(this.url +"/"+post._id+"?token="+tk.token, post)
        .map((response: Response)=>response.json)
        .catch((error:Response)=>Observable.throw(error))
        
    }
    //atualiza o post, like
    realizarLike(post){   
        let token =JSON.parse(localStorage.getItem("token"));    
        var idUsuario = token.idUsuario; 
        return this.http.put(this.url +"/"+post._id+"/like?idUsuario="+idUsuario, post)
        //.map((response: Response)=>response.json)
        .catch((error:Response)=>Observable.throw(error))
  
}
    getUsuarioPost(post){
      return this.http.get(this.url+"/"+post+"usuario")
      .map((response:Response)=>response.json)
      .catch((error:Response)=>Observable.throw(error))
  }
}
