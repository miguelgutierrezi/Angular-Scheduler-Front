import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {TasksComponent} from './components/tasks/tasks.component';
import {UsersComponent} from './components/users/users.component';
import {AuthGuard} from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home/:userId', component: TasksComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: UsersComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
