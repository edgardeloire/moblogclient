import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListArticlesPage } from './list-articles';

@NgModule({
  declarations: [
    ListArticlesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListArticlesPage),
  ],
})
export class ListArticlesPageModule {}
