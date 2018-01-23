import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { HomePage } from '../pages/home/home';
import { ArticlePage } from '../pages/article/article';
//import { ArticleDetailPage } from '../pages/articleDetail/article-detail';
import { ListArticlesPage } from '../pages/list-articles/list-articles';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClientModule } from '@angular/common/http';
import { ArticleApiRestProvider } from '../providers/article-api-rest/article-api-rest';

@NgModule({
  declarations: [
    MyApp,
    ListArticlesPage,
    HomePage,
    TabsPage,
    ArticlePage

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    ArticlePage,
    ListArticlesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ArticleApiRestProvider
  ]
})
export class AppModule {}
