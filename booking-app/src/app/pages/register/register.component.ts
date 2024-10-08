import { Component } from '@angular/core';
import {RegistrationRequest} from "../../services/models/registration-request";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {register} from "../../services/fn/authentication/register";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerRequest: RegistrationRequest  =  {email: '', firstname:'', lastname:'' , password: ''}
  errorMsg: Array<String> = [];

  constructor(
    private router:Router,
    private authService: AuthenticationService
  ) {
  }

  login() {
      this.router.navigate(['login'])
  }

  register() {
    this.errorMsg = [];
    this.authService.register({
      body: this.registerRequest
    }).subscribe({
      next:() => {
        this.router.navigate(['activate-account']);
      },
      error: (err) =>{
        this.errorMsg = err.error.validationErros
      }
    })

  }
}
