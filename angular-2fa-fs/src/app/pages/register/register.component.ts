import {Component} from '@angular/core';
import {RegisterRequest} from '../../models/register-request';
import {FormsModule} from '@angular/forms';
import {AuthenticationResponse} from '../../models/authentication-response';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {VerificationRequest} from '../../models/verification-request';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerRequest: RegisterRequest = {};
  authenticationResponse: AuthenticationResponse = {};
  msg: string = '';
  otpCode: string = '';


  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
  }

  registerUser() {
    this.msg = '';
    this.authService.register(this.registerRequest)
      .subscribe({
        next: (response) => {
          if (response) {
            this.authenticationResponse = response;
          } else {
            this.msg = 'Account created successfully\n You will be redirected in 3 s';
            setTimeout(() => {
              this.router.navigate(['welcome']);
            }, 3000)
          }
        }
      })
  }

  verifyTfa() {
    console.log("hyri ne verify ")
    this.msg = '';
    const verifyRequest: VerificationRequest = {
      email: this.registerRequest.email,
      code: this.otpCode
    }

    this.authService.verifyCode(verifyRequest)
      .subscribe({
        next: (response: AuthenticationResponse) => {
          this.msg = 'Account created successfully\n You will be redirected in 3 s';
          setTimeout(() => {
            localStorage.setItem('token', response.accessToken as string);
            this.router.navigate(['welcome']);
          }, 3000);
        },
      })

  }
}
