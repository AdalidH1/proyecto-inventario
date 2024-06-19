import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = "http://localhost:5000/api/user";
  constructor(private http: HttpClient) { }

  
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.url)
  }
  createUser(user:any):Observable<User>{
    return this.http.post<User>(this.url,user)
  }
  updateUser(user:any):Observable<User>{
    return this.http.patch<User>(this.url,user)
  }
  deleteUser(id:string):Observable<User>{
    return this.http.delete<User>(this.url+"/"+id)
  }
}
