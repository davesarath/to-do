import { Injectable } from '@angular/core';
import { throwError, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
 
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TodoServeService {

  constructor(private http: HttpClient) { }

  getHttpOptions(){
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':  "Token "+localStorage.getItem('token')

        
      })
    };
  }

  userRegister(data){
    let url:string =environment.base_url+'user/register/'
    // console.log(data);      
    return this.http.post(url, data)      
  }

  userLogin(data){
    // console.log(data);      
    let url:string =environment.base_url+'user/login/'
    return this.http.post(url,data)
    .pipe(map(user => {
        if (user && user['token']) {
          localStorage.setItem('token', user['token']);
        }
    })
    );

  }

  isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
  }

  createTask(data){
    let url:string =environment.base_url+'task/create/';
    let httpOptions = this.getHttpOptions(); 
    return this.http.post(url,data,httpOptions)
  }

  viewTaskList(){
    let url:string =environment.base_url+'task/list/';    
    let httpOptions = this.getHttpOptions();
    return this.http.get(url,httpOptions)
  }

  viewTask(task_id){
    let url:string =environment.base_url+'task/view/'+task_id+'/';
    let httpOptions = this.getHttpOptions();
    return this.http.get(url,httpOptions)
  }

  updateTask(task_id,data){
    let url:string =environment.base_url+'task/update/'+task_id+'/';
    let httpOptions = this.getHttpOptions();
    return this.http.patch(url,data,httpOptions)
  }
  
  deleteTask(task_id){
    let url:string =environment.base_url+'task/delete/'+task_id+'/';
    let httpOptions = this.getHttpOptions();
    return this.http.delete(url,httpOptions)
  }

}
