import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs'


/*
  Generated class for the LoginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LoginProvider {
  url:string = "http://localhost:3000/api/usuarios/logar";
  
  constructor(public http: Http, public storage:Storage) {
    
  }
  //essa função realiza uma requisição de login
  //caso for aceita, retorna um token gerado pelo servidor
   requestLogin(usuario){
    
          return this.http.post(this.url,usuario).map((response: Response)=>response.json())
        .catch((error:Response)=>Observable.throw(error));        
    }
    
    tokenExist():boolean{
      if(window.localStorage.getItem("token")){
        return true;
      }else{
        return false;
      }

    }
     valideToken():boolean{
    // chamada http para validar token
    return true;
  }
}
