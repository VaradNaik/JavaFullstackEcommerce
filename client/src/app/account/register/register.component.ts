// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.scss']
// })
// export class RegisterComponent {

// }
// // import { Component } from '@angular/core';
// import { UserService } from './user.service';
// import { User } from './user';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent {
//   user: User = new User();
//   submitted = false;

//   constructor(private userService: UserService) { }

//   registerUser(): void {
//     this.submitted = false;
//     this.userService.register(this.user)
//       .subscribe(data => console.log(data), error => console.log(error));
//     this.user = new User();
//   }

//   onSubmit() {
//     this.submitted = true;
//     this.registerUser();
//   }
// }
// import { Component } from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.scss']
// })
// export class RegisterComponent {
//   registerForm = new FormGroup({
//     username: new FormControl('', [Validators.required, Validators.minLength(3)]),
//     email: new FormControl('', [Validators.required, Validators.email]),
//     password: new FormControl('', [Validators.required, Validators.minLength(6)])
//   });

//   constructor(private http: HttpClient, private router: Router) { }

//   onSubmit(): void {
//     this.http.post('http://localhost:8080/account/register', this.registerForm.value)
//       .subscribe({
//         next: (response) => {
//           console.log('Registration successful', response);
//           this.router.navigate(['/store']);  // Navigate to the store page
//         },
//         error: (error) => {
//           console.error('Error during registration', error);
//         }
//       });
//   }
  
// }
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';  // Ensure you import AccountService
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
// export class RegisterComponent {
//   registerForm = new FormGroup({
//     username: new FormControl('', [Validators.required, Validators.minLength(3)]),
//     email: new FormControl('', [Validators.required, Validators.email]),
//     password: new FormControl('', [Validators.required, Validators.minLength(6)])
//   });

//   constructor(
//     private http: HttpClient, 
//     private router: Router,
//     private accountService: AccountService  // Inject the AccountService
//   ) { }

//   onSubmit(): void {
//     this.http.post('http://localhost:8080/account/register', this.registerForm.value)
//       .subscribe({
//         next: (response) => {
//           console.log('Registration successful', response);
//           this.autoLogin(); // Call autoLogin after successful registration
//         },
//         error: (error) => {
//           console.error('Error during registration', error);
//         }
//       });
//   }

//   private autoLogin() {
//     const loginValues = {
//       username: this.registerForm.value.username,
//       password: this.registerForm.value.password
//     };
//     this.accountService.login(loginValues).subscribe({
//       next: user => {
//         const redirect = this.accountService.redirectUrl ? this.accountService.redirectUrl : '/store';
//         this.router.navigateByUrl(redirect);
//         this.accountService.redirectUrl = null; //clearing the redirect url post navigation
//       },
//       error: () => {
//         console.error('Error Occurred during auto-login');
//       }
//     });
//   }
// }
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  errorMessage: string = '';

  constructor(
    private http: HttpClient, 
    private router: Router,
    private accountService: AccountService // Include AccountService in the constructor
  ) {}

  onSubmit(): void {
    this.http.post('http://localhost:8080/account/register', this.registerForm.value).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.autoLogin();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error during registration', error);
        if (error.status === 400) {
          this.handleBadRequest(error.error);
        } else {
          this.errorMessage = 'An unexpected error occurred during registration.';
        }
      }
    });
  }

  private autoLogin() {
    const loginValues = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password
    };
    this.accountService.login(loginValues).subscribe({
      next: user => {
        const redirect = this.accountService.redirectUrl ? this.accountService.redirectUrl : '/store';
        this.router.navigateByUrl(redirect);
        this.accountService.redirectUrl = null; // Clearing the redirect URL post navigation
      },
      error: () => {
        console.error('Error occurred during auto-login');
      }
    });
  }

  private handleBadRequest(errorResponse: string) {
    if (errorResponse === 'duplicate username') {
      this.errorMessage = errorResponse;
      // You can also set error directly on the form control
      this.registerForm.controls['username'].setErrors({ 'duplicate': true });
    } else if (errorResponse === 'duplicate emailId') {
      this.errorMessage = errorResponse;
      this.registerForm.controls['email'].setErrors({ 'duplicate': true });
    }
  }
}



