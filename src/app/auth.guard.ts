// // auth.guard.ts

// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthserviceService } from './authservice.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(private authService: AuthserviceService, private router: Router) { }

//   canActivate(): boolean {
//     if (this.authService.isAuthenticated()) {
//       return true;
//     } else {
     
//       console.log("User is not authenticated. Redirecting to login page.");
//       this.router.navigate(['/dashboard']);
//       return false;
//     }
//   }
// }
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Injectable } from '@angular/core';
 import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private authservice:AuthserviceService){

  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    boolean {
      if(!this.authservice.isLoggedIn()){
        this.router.navigate(['login']);
        // return false;
      }
      return this.authservice.isLoggedIn();
    }

};