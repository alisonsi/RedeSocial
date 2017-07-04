import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


/*
  Generated class for the UsuariosProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UsuariosProvider {
  url:String = "http://localhost:3000/api/usuarios"
  constructor(public http: Http) {
    console.log('Hello UsuariosProvider Provider');
  }
  getUsuario(idUsuario){
    return this.http.get(this.url+"/"+idUsuario).map((response: Response)=>response.json())
        .catch((error:Response)=>Observable.throw(error));
  }
}
