import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '.././services/auth.service';
import { UserService } from '.././services/user.service'
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  currentUser: Object;

  isAuth: boolean;

  constructor(
    private session: AuthService,
    private router:  Router,
    private userService: UserService,
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

       console.log(this.session);
     } else {
       this.isAuth = false;
     }

  }





  ngOnInit() {

    console.log("logging from profile component", JSON.parse(localStorage.getItem("user")));

    this.route.params.subscribe(params => {
      this.getUserDetails(params['id']);
    });

    // this.currentUser = JSON.parse(localStorage.getItem("user"))
    // let currentUser = JSON.parse(localStorage.getItem("user"))
    // console.log(currentUser);

  }

  getUserDetails(id) {
     this.userService.get(id)
       .subscribe((user) => {
         this.currentUser = user;
         console.log(this.currentUser);
       });
   }


  }
