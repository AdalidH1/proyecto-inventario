import { Injectable } from "@angular/core";
import { AuthService } from "./service/auth.service";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate{
  constructor(private authService:AuthService,
    private router:Router,
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let response = true
      console.log(this.authService.isAuthenticateUser())

      if (!this.authService.isAuthenticateUser()){
        this.router.navigate(['/login'])
        response = false
      }
      return response
  }
}