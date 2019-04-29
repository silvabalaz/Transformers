import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './home/page-not-found.component';
import {MenuComponent} from './home/menu.component';
import {WelcomeComponent} from './home/welcome.component';
import {ShellComponent} from './home/shell.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {TransformerData} from './transformers/transformer-data';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    MenuComponent,
    WelcomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(TransformerData),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


