import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';


/*
  Generated class for the SiginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SiginProvider {
  url:string = "http://localhost:3000/api/usuarios";
  constructor(public http: Http) {
    console.log('Hello SiginProvider Provider');
    
  }
  requestSigin(usuario){ 
     return this.http.post(this.url,usuario).map((response: Response)=>response.json())
        .catch((error:Response)=>Observable.throw(error)); 
  }

  // siging(usuario){
  //         return this.http.post(this.url,usuario).map((response: Response)=>response.json())
  //       .catch((error:Response)=>Observable.throw(error));        
  //   }

}
