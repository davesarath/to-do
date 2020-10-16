import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { ViewTodoComponent } from './view-todo/view-todo.component';

const routes: Routes = [
  {
    path      : "signin",
    component :  SigninComponent
  },
  {
    path      : '',
    component :  HomeComponent
  },
  {
    path      : 'todo/:id',
    component :  ViewTodoComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
