import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from './components/users/register/register.component';
import {LoginComponent} from './components/users/login/login.component';
import {TasksComponent} from './components/tasks/tasks.component';
import {HttpClientModule} from '@angular/common/http';
import {CypherService} from './services/cypher.service';
import {TasksService} from './services/tasks.service';
import {UserService} from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    HttpClientModule,
    CypherService,
    TasksService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
