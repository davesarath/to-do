import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoServeService } from '../todo-serve.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-todo',
  templateUrl: './view-todo.component.html',
  styleUrls: ['./view-todo.component.css']
})
export class ViewTodoComponent implements OnInit {
  @ViewChild('closebutton',{ static: true}) closebutton;
  id=0;
  data;
  constructor(private serve: TodoServeService,private router:Router,public route: ActivatedRoute) { }

  TaskForm = new FormGroup({
    'title': new  FormControl("",[ Validators.required]),
    'status': new  FormControl("todo",[ Validators.required]),
  });

  getTaskDetails(){
    this.serve.viewTask(this.id).subscribe(
      Response=>{
        this.data=Response['data'];
        // console.log(this.data);
        
      },error=>{
        console.log(error);        
      }
    )
  }

  setupEditTask(){
    this.TaskForm.setValue({'title':this.data['title'],'status':this.data['status']})
  }

  updateTaskDetails(form){
    this.serve.updateTask(this.id,form.value).subscribe(
      Response=>{
        this.data=Response['data'];
        // console.log(Response);
        this.closebutton.nativeElement.click();        
      },error=>{
        console.log(error);
      }
    )
  }

  removeTask(){
    this.serve.deleteTask(this.id).subscribe(
      Response=>{
        console.log('deleting...');
        this.router.navigate(['/']);
      },error=>{
        console.log(error);        
      }
    )
  }

  logoutFn(){
    this.serve.logout()
    console.log('logout....');
    this.router.navigate(['/signin']);
  }

  ngOnInit() {
    if(!this.serve.isLoggedIn()){
      this.router.navigate(['/signin']);
    } 
    this.route.params.subscribe(params => {
      this.id=params['id']
    });
    this.getTaskDetails()
  }


}
