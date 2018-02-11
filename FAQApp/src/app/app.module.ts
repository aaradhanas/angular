import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { QuestionListComponent } from './components/question-list/question-list.component';

import { DataService } from './services/data.service';
import { QuestionComponent } from './components/question/question.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';

// For keycloak

import { KeycloakService } from './keycloak/keycloak.service';
import { KeycloakHttp } from './keycloak/keycloak.http';
import { keycloakHttpFactory } from './keycloak/keycloak.http';
import { XHRBackend, RequestOptions } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    QuestionListComponent,
    QuestionComponent,
    AddQuestionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    DataService,
    {
      provide: KeycloakHttp,
      useFactory: keycloakHttpFactory,
      deps : [XHRBackend, RequestOptions, KeycloakService]
    },
    KeycloakService],
  bootstrap: [AppComponent]
})
export class AppModule { }
