import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import {ArticleApiRestProvider} from '../../providers/article-api-rest/article-api-rest';

/**
 * Generated class for the ListArticlesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-articles',
  templateUrl: 'list-articles.html',
})
export class ListArticlesPage {

  articles: any;
  article: any;

  constructor(
     public events:Events,
     public navCtrl: NavController,
     public navParams: NavParams,
     public articleApiRestProvider: ArticleApiRestProvider) {
     events.subscribe('article:created', () => {
       // user and time are the same arguments passed in `events.publish(user, time)`
       console.log('article:created');
     });
  }
  getArticles() {
    this.articleApiRestProvider.getArticles()
    .then(data => {
      this.articles = data;
      console.log(this.articles);
    });
  }
  getArticle(id) {
    this.articleApiRestProvider.getArticle(id)
    .then(data => {
      this.article = data;
      console.log(this.article);
    });
  }


  ionViewDidLoad() {
    this. getArticles();
    console.log('ionViewDidLoad ListArticlesPage');
  }


}
