import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';



let apiUrl = 'https://ilkcandogan.com/';

let homePoint ="videolar.php"
let endPoint = 'cikis.php';
@Injectable()
export class AuthServiceProvider {
  
  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }

  
 
  private()
  {
    let r = apiUrl + endPoint;
    let headers = new Headers();
    headers.append('Authorization' , window.localStorage.getItem('token'));
    
      let options = new RequestOptions({ headers:headers});
    return new Promise((resolve,reject)=>{
       this.http.post(r, options).subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    })
  }

  /* Home Page Sayfasının veri çekim Modülü */
  callServer(url): Promise<any>
  {
    let response : Promise<any>;
    response = this.http.get(url).toPromise().then(responseData => responseData)
    .catch(err => this.errorDisplay(err));
    return response;
  }

  /*Server'dan gelen hata */
  errorDisplay(error:any): Promise<any>
  {
    return Promise.reject(error.message || error);

  }

  logout()
  {
    window.localStorage.removeItem('token');
    return true
  }
  getData()
  {
    return this.http.get(apiUrl+homePoint)
  }
  postData(credentials, type){
    
    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      this.http.post(apiUrl+type, JSON.stringify(credentials), {headers: headers}).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });

    });

  }
 
}
