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
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit(): void {
    this.http.post('http://localhost:8080/account/register', this.registerForm.value)
      .subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.router.navigate(['/store']);  // Navigate to the store page
        },
        error: (error) => {
          console.error('Error during registration', error);
        }
      });
  }
  
}


