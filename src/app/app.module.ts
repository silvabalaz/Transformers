import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {PageNotFoundComponent} from './home/page-not-found.component';
import {MenuComponent} from './home/menu.component';
import {WelcomeComponent} from './home/welcome.component';
import {ShellComponent} from './home/shell.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    MenuComponent,
    WelcomeComponent,
    ShellComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
