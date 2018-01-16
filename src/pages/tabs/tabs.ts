import { Component } from '@angular/core';

import { ListArticlesPage } from '../list-articles/list-articles';
import { HomePage } from '../home/home';
import { ArticlePage } from '../article/article';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ArticlePage;
  tab2Root = ListArticlesPage;
  // tab3Root = AboutPage;

  constructor() {

  }
}
