import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = "http://localhost:5000/api/user"
  constructor(private http:HttpClient) { }

  login(login:any):Observable<any>{
    return this.http.post<any>(`${this.url}/login`, login)
    .pipe(
      tap (user => localStorage.setItem('token', JSON.stringify(user.token)))
    )
  }

  isAuthenticateUser(): boolean{
    let token = localStorage.getItem("token")
    if(token !== null && token !== ""){
      return true
    }else {
      return false
    }
  }
}
