import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { TabsComponent } from './tabs/tabs.component';
import { CollectionComponent } from './collection/collection.component';
import { RatingCategoryPipe } from './rating-category.pipe';
import { RatingComponent } from './rating/rating.component';
import { routing } from "app/app.routing";
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookDetailGuard } from "app/book-guard.service";
import { NewBookComponent } from './new-book/new-book.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    TabsComponent,
    CollectionComponent,
    RatingCategoryPipe,
    RatingComponent,
    BookDetailComponent,
    NewBookComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    routing
  ],
  entryComponents: [
    BookDetailComponent,
    NewBookComponent
  ],
  providers: [BookDetailGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
