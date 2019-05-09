import {Http} from '@angular/http'
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  questions:any;
  constructor(public http: Http) {
    
  }
loadData()
{
  if(this.questions)
  {
    return Promise.resolve(this.questions);
  }
   return new Promise(resolve=>{
          this.http.get('assets/data/questions.json').map(res=>res.json()).subscribe(data=>{
            this.questions=data.questions;
            resolve(this.questions);
          })
   })
}


}
