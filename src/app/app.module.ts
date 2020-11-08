import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TasksComponent} from './components/tasks/tasks.component';
import {HttpClientModule} from '@angular/common/http';
import {CypherService} from './services/cypher.service';
import {TasksService} from './services/tasks.service';
import {UserService} from './services/user.service';
import {UsersComponent} from './components/users/users.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from './services/auth.guard';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    UsersComponent,
    NotFoundComponent,
    NavbarComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CypherService,
    TasksService,
    UserService,
    AuthGuard
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
