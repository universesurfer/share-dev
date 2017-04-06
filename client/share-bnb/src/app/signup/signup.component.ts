import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	newUser = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  user: any;
  error: string;


  constructor(
  	private session: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  // (mess)=>{
  //   console.log("from component");
  //   console.log(mess);
  //

  signup() {
  	this.session.signup(this.newUser, (error)=>{
        console.log("from component");
        console.log(error);
    })

      .subscribe(result => {
          if (result === true) {
              // login successful
              console.log('result ok', result);
              console.log(this.newUser);
              this.router.navigate(['/home']);
          } else {
          		console.log('result ko', result);
              // login failed
              // this.error = 'Username or password is incorrect';
          }
      });
  }
}
