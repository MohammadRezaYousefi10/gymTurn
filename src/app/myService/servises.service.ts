import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServisesService {
  private apiUrl_register = 'http://localhost:3500/register';
  private apiUrl_Login = 'http://localhost:3500/auth';
  private apiUrl_employees = 'http://localhost:3500/employees';
  private apiUrl_Update_photo = 'http://localhost:3500/api/upload';
  private apiUrl_Update_user = 'http://localhost:3500/api/users';

  currentUser : any = null;
  fullname : any;
  userId : any;
  constructor(private http : HttpClient ) { 
   
  }

  // get Access token
  private getHeaders(){
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({'Authorization' : `Bearer ${token}`});
  }
 

  // Register with long form
  sendData(data : any): Observable<any>{
      return this.http.post(this.apiUrl_register , data);  
  }
  
  // Login with user and password
  login(data : any): Observable<any>{
    
    return this.http.post(this.apiUrl_Login , data).pipe(map((response : any)=>{ /* catchError(this.handleError) */
      if (response && response.accessToken) {
        localStorage.setItem('currentUser' , JSON.stringify(response));
        this.currentUser = response;
        this.fullname = response.user;
        this.userId = response.id;
      }
      return response;
    }) , catchError(this.handleError));  
  }
  getCurrentUser(): any{
    /* const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null; */
     if(!this.currentUser){
      const storedUser = localStorage.getItem('currentUser');
      if(storedUser){
        this.currentUser = JSON.parse(storedUser);
      }
    }
    return this.currentUser; 
  }
  logout(){
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }
  hasRole(role : any) : boolean{
    const user = this.getCurrentUser();
    if (!user){  
      
      return false;
    }
    
    if (user.roles[2] == role){
      return true;
    }else{
      return false;
    }
  }
  
  hasRoleVip(r : any) : boolean{
    const user = this.getCurrentUser();
    if (!user){  
      
      return false;
    }
    
    if (user.roles[1] == r){
      return true;
    }else{
      return false;
    }
  }


  private handleError(error:HttpErrorResponse){
    let errorMessage = 'there is a Error';
    if(error.error instanceof ErrorEvent){
      errorMessage = `Error: ${error.error.message}`;
    }else {
      errorMessage = `${error.error.message}`
    }
    return throwError(errorMessage);
  }
  
  // get Users
  getData(): Observable<any>{
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization' , `Bearer ${token}`);
    return this.http.get<any>(this.apiUrl_employees , {headers});
  }

  //get user
  getUser(): Observable<any>{
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization' , `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl_Update_user}/current`);
  }
  //update user
  updateUser(user:any): Observable<any>{
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization' , `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl_employees}` , user , {headers}) ;
  }

  // delet user 
  
}
