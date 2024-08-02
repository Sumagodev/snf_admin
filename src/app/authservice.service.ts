// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, of } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthserviceService {
//   private isLoggedIn = false;
//   constructor() { }
//   login(username: string, password: string): Observable<any> {
//     console.log('Attempting to log in with username:', username, 'and password:', password);
//     if (username === 'test@gmail.com' && password === 'test') {
//       this.isLoggedIn = true;
//       console.log('Login successful');
//       localStorage.setItem('isLoggedIn', 'true');
//       localStorage.setItem('username', username);
//       localStorage.setItem('password', password);
//       return of(true); // Returning an Observable of true if login is successful
//     } else {
//       console.log('Login failed');
//       return of(false); // Returning an Observable of false if login fails
//     }
//   }

 



//   isAuthenticated(): boolean {
//     console.log('Checking authentication status...');
//     return this.isLoggedIn || localStorage.getItem('isLoggedIn') === 'true';
//   }



// }
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//import { log } from 'console';
import { BehaviorSubject,  Observable,  of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  
  public apiUrl = 'https://snf.backend.socialforumindia.com/auth/login'; ///live
  // private apiUrl = 'https://trainingapi.sumagotest.in/public/api/'; ////test
  // private apiUrl = 'http://trainingadmin.sumagotest.in/public/api/'; 
  
  // private apiUrl = 'https://admin.sumagotraining.in/public/api/';
   token:any;
  private loggedIn = new BehaviorSubject<boolean>(false);
  access_token: any;
  


  constructor(private router:Router,private http:HttpClient) { }

  // login(email:string,password: string):Observable<any>{
  //   if(email=='mohini@gmail.com' && password =='12345678'){
  //     this.setToken('abcdefghijklmnopqrstuvwxyz');
  //     return of({name:'mohini',email:'admin@gmail.com'});

  //   }
  //   return throwError("Failed")
  // }
  // 18 june
  //  setToken(token:any):void{
  //   this.token = localStorage.setItem('access_token', this.token);
  //  }

  // setToken(token: string): void {
  //   this.token.token = token;
  //   localStorage.setItem('access_token', this.token.token);

  // }

  // getToken():string | null {
  // return  localStorage.getItem('access_token')
  // }
  setToken(token: any): void {
    localStorage.setItem('access_token', token);
    // localStorage.setItem('password',password);
    //     localStorage.setItem('email',email)
  }
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
  clearToken(): void {
    this.token = null;
    localStorage.removeItem('access_token');
  }

  isLoggedIn(){
     return this.getToken()!==null
  }
  
  // logout(): Observable<any> {
  //   const url = ${this.apiUrl}logout;
  //   const headers = new HttpHeaders().set('Authorization', Bearer ${localStorage.getItem('access_token')});
  
  //   return this.http.post(url, null, { headers }).pipe(
  //     tap(() => {
  //       this.clearToken();
  //       // this.clearUser();
  //       localStorage.removeItem('access_token');
  //       localStorage.removeItem('email');
  //       localStorage.removeItem('id');
  //       this.router.navigate(['login']);
  //       console.log("login here");
        
  //     })
  //   );
  // }
  // clearToken() {
  //   this.token = null;
  // }
  
  // logout() {
    
  //   localStorage.removeItem('access_token');
  //   this.router.navigate(['login']);
  // }


  //Logout


  
  logout(): void {
    console.log('Logging out...'); 
    alert('Are you sure you want to logout ?');
    localStorage.removeItem('token'); 
    console.log('Token removed:', localStorage.getItem('token')); 
  }
  
  login(email: any, password: any): Observable<any> {
    const url = `${this.apiUrl}`;
   return this.http.post(this.apiUrl, { email, password }).pipe(
     tap((response: any) => {
      console.log("response",response);
      
       this.setToken(response.token);
        // .this.setUser(response.id,response.username,response.email)
       
        
        localStorage.setItem('password',response.password);
        localStorage.setItem('email',response.email)
        // localStorage.setItem('id',response.id)
        localStorage.setItem('access_token', response.token);
        console.log(response.token);
         return response;
         
         console.log('Done');
      })
  );
  }
 

// login(email: any, password: any): Observable<any> {
//   const url = `${this.apiUrl}`;
//   return this.http.post(url, { email, password }).pipe(
//     tap((response: any) => {
//       console.log("Login response:", response);
      
//       // Assuming response contains access_token, email, and password properties
//       this.setToken(response.access_token);
//       localStorage.setItem('email', response.email);
//       localStorage.setItem('password', password); // Store the password securely
//     })
//   );
// }

// login(email: string, password: string): Observable<any> {
//   return this.http.post(this.Url, { email, password }).pipe(
//     tap((response: any) => {
//       this.setToken(response.access_token);
//       localStorage.setItem('email', response.email);
//       localStorage.setItem('id', response.id);
//       this.loggedIn.next(true);
//     })
//   );
// }

}