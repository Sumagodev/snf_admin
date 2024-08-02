import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../../authservice.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private auth: AuthserviceService, private router: Router) { }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;

      this.auth.login(email, password).subscribe(
        (result: any) => {
          console.log(result);
          alert('Login Successfully');
          this.auth.setToken(result.access_token);
          localStorage.setItem('email',result.email);
          localStorage.setItem('password',result.password)
          localStorage.setItem('access_token',result.token);
          console.log(this.auth.getToken());
          
          this.router.navigate(['/home']);
        },
        (err: any) => {
          console.error(err);
          if (err.status === 404) {
            alert(err.error.message); // Display error message from the server
          } else {
            alert('An error occurred. Please try again later.');
          }
        }
      );
    } else {
      this.signInForm.markAllAsTouched();
    }
  }
  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']); // Navigate to login page after logout
  }
  // onSubmit(): void {
  //   if (this.signInForm.valid) {
  //     const { email, password } = this.signInForm.value;
  
  //     this.auth.login(email, password).subscribe(
  //       (result: any) => {
  //         console.log("Login result:", result);
  //         // Assuming 'result' contains access_token, email, and password properties
  
  //         // Store credentials securely
  //         localStorage.setItem('email', result.email);
  //         localStorage.setItem('password', result.password); // Store the password securely
  //         localStorage.setItem('access_token', result.access_token);
  
  //         this.router.navigate(['main']);
  //       },
  //       (err: any) => {
  //         console.error(err);
  //         if (err.status === 404) {
  //           alert(err.error.message); // Display error message from the server
  //         } else {
  //           alert('An error occurred. Please try again later.');
  //         }
  //       }
  //     );
  //   } else {
  //     this.signInForm.markAllAsTouched();
  //   }
  // }
}
