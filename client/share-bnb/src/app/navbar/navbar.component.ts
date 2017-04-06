import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '.././services/auth.service';
import { UserService } from '.././services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuth: boolean;

  user: any;
  // currentUser: any;


  constructor(
    private session: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.session.isAuth
      .subscribe((isAuth: boolean) => {
      // user will be false if logged out
      // or user object if logged in.
        this.isAuth = isAuth;
      });

  if (this.session.token) {
    this.isAuth = true;
  } else {
    this.isAuth = false;
  }


  this.user = JSON.parse(localStorage.getItem("user"));
  // this.currentUser = JSON.parse(this.user);

  console.log(this.user);
}

  ngOnInit() {

  }


  logout() {
   this.session.logout();

 }




}
