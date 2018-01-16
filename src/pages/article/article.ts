import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';

import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import {ArticleApiRestProvider} from '../../providers/article-api-rest/article-api-rest';
import {UICONFIG} from '../../assets/config/parameter'

@IonicPage()
@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
})
export class ArticlePage {

  public title:string;
  public content:string;
  public base64Image:string="assets/imgs/nophoto.png";
  public chapter_title: Array<string>= UICONFIG.chapter_title;
  public chapter_title_selection : string;


  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     private alertCtrl: AlertController,
     private formBuilder: FormBuilder,
     private camera: Camera,
     private DomSanitizer: DomSanitizer,
     private articleApiRestProvider: ArticleApiRestProvider,
     private toastCtrl: ToastController)
     {}



  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticlePage');
  }
  takePhoto(){
     const options: CameraOptions = {
       quality: 100,
       allowEdit:true,
       destinationType: this.camera.DestinationType.DATA_URL,
       encodingType: this.camera.EncodingType.JPEG,
       mediaType: this.camera.MediaType.PICTURE
      }

      this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image =  "data:image/jpeg;base64," + imageData;
      }, (err) => {
         console.log(err);
               alert(err);
      });
 }
  validate(){
     let body={

            "chapter_id": Number(this.chapter_title_selection),
            "content": this.content,
            "photo_file_name": "no-photo.jpg",
            "subchapter_id": 1,
            "title": this.title
       }
     this.articleApiRestProvider.postArticle(body)
       .then(data => {
         let toast = this.toastCtrl.create({
           message: 'Article : '+this.title+'Chapter : '+this.chapter_title_selection+' has been created',
           duration: 2000,
           position: 'bottom'
         });
         toast.present();
         console.log('Article : '+this.title+'Chapter : '+this.chapter_title_selection+' has been created');
       });
    }
}
