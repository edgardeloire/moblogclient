import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams,ToastController ,ModalController} from 'ionic-angular';
import { AlertController,Events } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';

import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import {ArticleApiRestProvider} from '../../providers/article-api-rest/article-api-rest';
import {UICONFIG} from '../../assets/config/parameter'

@IonicPage()
@Component({
  selector: 'page-article-detail',
  templateUrl: 'article-detail.html',
})
export class ArticleDetailPage {



  public base64Image:string="assets/imgs/nophoto.png";
  public chapter_title: Array<string>= UICONFIG.chapter_title;
  public chapter_title_selection : string;
  public imageData:any;
  article_id:any;
  articleData:any;


  constructor(
     public modalCtrl: ModalController,
     public events: Events,
     public navCtrl: NavController,
     public navParams: NavParams,
     private alertCtrl: AlertController,
     private formBuilder: FormBuilder,
     private camera: Camera,
     private DomSanitizer: DomSanitizer,
     private articleApiRestProvider: ArticleApiRestProvider,
     private toastCtrl: ToastController)
     {
        this.article_id = navParams.get('article_id') // || items.defaultItem;
        this.articleData=""; //init field

     }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticlePageDetail');
    this.getarticle(this.article_id);
  }

  getarticle(article_id){
  this.articleApiRestProvider.getArticle(article_id ).then(data=>{
       this.articleData=data
     // ADD Image provider and display
     this.articleApiRestProvider.getArticlePhoto(article_id ).then(photo=>{
     this.base64Image=photo["changingThisBreaksApplicationSecurity"] // Suite sanitize rest response
    })

 })
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
      // imageData is either a base64 encoded string or a file URI.
      // If it's base64:
      this.base64Image =  "data:image/jpeg;base64," + imageData;
      this.imageData=imageData;
      }, (err) => {
         console.log(err);
               alert(err);
      });
 }
 // delete article
  delete(article_id){

    this.articleApiRestProvider.deleteArticle(article_id)
     .then(data => {
          let toast = this.toastCtrl.create({
             message: 'Article Id : '+article_id+' has been deleted',
             duration: 3000,
             position: 'bottom'
          });
          toast.present();
          // broacast event to refresh list
          this.events.publish('article:created');
          // this.navCtrl.push('ListArticlesPage', {});
     });
   }

  // update article
  update(article_id){
     let body={
            "chapter_id": Number(this.chapter_title_selection),
            "content": this.articleData.content,
            "photo_file_name": "no-photo.jpg",
            "subchapter_id": 1,
            "title": this.articleData.title
       }

     let imageContent ={
        base64Image : this.imageData
     }
     this.articleApiRestProvider.patchArticle(article_id,body)
       .then(data => {
            let response:any=data
            let toast = this.toastCtrl.create({
              message: 'Article : '+this.articleData.title+ 'Id :'+response.id+' Chapter : '+this.chapter_title_selection+' has been created',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
            console.log('Article:'+this.articleData.title+ ' Id:'+response.id+' Chapter:'+this.chapter_title_selection+' has been created');
            // broacast event to refresh list
            this.events.publish('article:created');

            if (this.imageData != null) {
               this.articleApiRestProvider.postPhotoArticle(imageContent,response.id)
                .then(data => {
                 let toast = this.toastCtrl.create({
                   message: 'Photo : '+this.articleData.title+ 'Id :'+response.id+' Chapter : '+this.chapter_title_selection+' has been saved',
                   duration: 3000,
                   position: 'bottom'
                 });
                 toast.present();
               });
            }
       });
    }
}
