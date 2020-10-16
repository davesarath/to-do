import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { TodoServeService } from '../todo-serve.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
 
  todoList;
  constructor(private serve: TodoServeService,private router:Router) { }

  
  addTaskForm = new FormGroup({
    'title': new  FormControl("",[ Validators.required]),
    'status': new  FormControl("todo",[ Validators.required]),
  });

  addTaskFn(form){
    console.log(form);
    console.log(form.value);
    this.serve.createTask(form.value).subscribe(
      Response=>{
        this.getTaskList();
      },
      error=>{
        console.log(error);
      }
    );
    this.addTaskForm.reset({'title':'','status':'todo'});
    this.closebutton.nativeElement.click();

  }

  logoutFn(){
    this.serve.logout()
    console.log('logout....');
    this.router.navigate(['/signin']);
  }

  getTaskList(){
    this.serve.viewTaskList().subscribe(
      Response=>{
        this.todoList=Response['data'];
        console.log(this.todoList);
        
      },
      error=>{
        console.log('something went wrong');        
      }
    )
  }

  ngOnInit() {
    if(!this.serve.isLoggedIn()){
      this.router.navigate(['/signin']);
    }
    this.getTaskList()
  }

}
