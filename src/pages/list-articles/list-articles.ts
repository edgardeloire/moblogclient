import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events,AlertController  } from 'ionic-angular';
import {ArticleApiRestProvider} from '../../providers/article-api-rest/article-api-rest';
@IonicPage()
@Component({
  selector: 'page-list-articles',
  templateUrl: 'list-articles.html',
})
export class ListArticlesPage {

  articles: any;
  article: any;

  constructor(
     public alertCtrl: AlertController,
     public events:Events,
     public navCtrl: NavController,
     public navParams: NavParams,
     public articleApiRestProvider: ArticleApiRestProvider) {

  }

  getArticles() {
    this.articleApiRestProvider.getArticles()
    .then(data => {
      this.articles = data;
      console.log(this.articles);
    });
  }
  getArticle(id) {
    // call detail with id
    this.navCtrl.push('ArticleDetailPage', {
          article_id: id
        });

  }


  ionViewDidLoad() {
    this. getArticles();
    console.log('ionViewDidLoad ListArticlesPage');
    this.events.subscribe('article:created', () => {
    // user and time are the same arguments passed in `events.publish(user, time)`
    this. getArticles();
  });
  }


}
