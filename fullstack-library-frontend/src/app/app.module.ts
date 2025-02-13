import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookDetailsComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
