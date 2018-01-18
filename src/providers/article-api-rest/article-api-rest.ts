import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {RESTCONFIG} from '../../assets/config/parameter'

/*
  Generated class for the ArticleApiRestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ArticleApiRestProvider {

   constructor(public http: HttpClient) {
    console.log('Starting ArticleApiRestProvider ');
   }
   getArticles() {
   return new Promise(resolve => {
    this.http.get(RESTCONFIG.apiUrl+'articles/').subscribe(data => {
      resolve(data);
      console.log(data);
    }, err => {
      console.log(err);
    });
   });
   }
   // Single article retreival
   getArticle(id) {
   return new Promise(resolve => {
    this.http.get(RESTCONFIG.apiUrl+'article/'+id).subscribe(data => {
      resolve(data);
      console.log(data);
    }, err => {
      console.log(err);
    });
   });
   }
   // Create Article
   postArticle(body) {
   return new Promise(resolve =>  {
    this.http.post(RESTCONFIG.apiUrl+'article/',body).subscribe
    (data => {
      resolve(data);
      console.log(data);
    }, err => {
      console.log("ERROR : "+err);
    });
   });
   }
   // Create Photo
   postPhotoArticle(body,id) {
   return new Promise(resolve =>  {
     this.http.post(RESTCONFIG.apiUrl+'article/photoB64/'+id,body).subscribe
     (data => {
       resolve(data);
       console.log(data);
     }, err => {
       console.log("ERROR : "+err);
     });
   });
   }

}
