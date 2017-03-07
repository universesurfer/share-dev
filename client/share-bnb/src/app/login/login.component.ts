import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  error: string;

  constructor(
    private session: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this.session.login(this.user)
				        .subscribe(result => {
				            if (result === true) {
			                // login successful
			                this.router.navigate(['/home']);
			         			} else {
			                // login failed
			                this.error = 'Email or password is incorrect';
				            }
				        });
  }

}
