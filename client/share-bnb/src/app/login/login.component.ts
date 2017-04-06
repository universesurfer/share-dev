import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };

  error: string;

  currentUser: any;

  constructor(
    private session: AuthService,
    private userService: UserService,
    private router: Router
    // private route: ActivatedRoute,
    // public http: Http
  ) { }

  ngOnInit() {
  }

  login() {
    this.session.login(this.user)
		        .subscribe(result => {
		            if (result === true) {
	                // login successful
	                this.router.navigate(['/']);


                  // this.route.params.subscribe(params => {
                  //   this.getUserDetails(params['id']);
                  // });


                  // console.log(this.user); //console log the data of user who logs in
                                          //only showing email and password b/c that's all that's entered in form


	         			} else {
	                // login failed
	                this.error = 'Email or password is incorrect';
		            }
		        });
  }


  // getUserDetails(id) {
  //    this.userService.get(id)
  //      .subscribe((user) => {
  //        this.currentUser = user;
  //        console.log(this.currentUser);
  //      });
  //  }


}
