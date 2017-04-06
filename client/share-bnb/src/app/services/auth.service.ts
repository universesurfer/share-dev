import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService implements CanActivate {

  // public currentUser: any;
  public token: string;
  isAuth: EventEmitter<any> = new EventEmitter();

	BASE_URL: string = 'http://localhost:3000';

  constructor(
    private router: Router,
    private http: Http
  ) {
      // set token if saved in local storage
      this.token = localStorage.getItem('token');
      if (this.token != null) {
        this.isAuth.emit(true);
      } else {
        this.isAuth.emit(false);
      }

      // let currentUser = JSON.parse(localStorage.getItem('currentUser'));

  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('token')) {
      // logged in so return true\
      return true;
    }
    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    this.isAuth.emit(true);
    return false;
  }

  isAuthenticated() {
    return this.token != null ? true : false;
  }

  signup(user) {
  	return this.http.post(`${this.BASE_URL}/signup`, user)
  		.map((response) => response.json())
  		.map((response) => {
  			let token = response.json() && response.json().token;
        let user = response.json().user;
  			if (token) {
          // set token property
          // this.currentUser = response.json().user
          this.token = token;
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', token );
          localStorage.setItem('user', JSON.stringify(user));

          this.isAuth.emit(true);
          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
  		})
      .catch((err) => {
        return Observable.throw(err);
      });
  }

  login(user) {
    return this.http.post(`${this.BASE_URL}/login`, user)
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            //NEED TO SET A USER VARIABLE EQUAL TO RESPONSE for SETTING LOCALSTORAGE
            let token = response.json() && response.json().token;
            let currentUser = JSON.stringify(response.json().user);

            if (token) {

              // set token property
              this.token = token;

              this.isAuth.emit(true);
              // store username and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('token', token );
              // localStorage.setItem('user', user);
              localStorage.setItem('user', currentUser );

              // return true to indicate successful login
              return true;

            } else {
              // return false to indicate failed login
              return false;
            }
        })
        .catch((err) => {
          return Observable.throw(err);
        });
  }

  logout() {
      // clear token remove user from local storage to log user out
      this.token = null;
      this.isAuth.emit(false);
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
  }






}
