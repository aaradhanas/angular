import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';

import { DataService } from './services/data.service';

//import { MarkdownModule } from 'angular2-markdown';
import { ShowdownModule } from 'ngx-showdown';

import { EditorComponent } from './components/editor/editor.component';
import { LeftNavbarComponent } from './components/left-navbar/left-navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    TopNavbarComponent,
    EditorComponent,
    LeftNavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    //MarkdownModule.forRoot(),
    FormsModule,
    ShowdownModule
  ],
  providers: [ DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
