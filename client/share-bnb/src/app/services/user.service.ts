import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions, Response} from '@angular/http';

@Injectable()
export class UserService {

  BASE_URL: string = 'http://localhost:3000';

  constructor(
    private http: Http,
    private authService: AuthService

  ) { }



  getList() {
    return this.http.get(`${this.BASE_URL}/users`)  //this url works because /users is specified in app.js
      .map((res) => res.json());
  }


  get(id) {
  let headers = new Headers({ 'Authorization': 'JWT ' + this.authService.token });
  let options = new RequestOptions({ headers: headers });
  return this.http.get(`${this.BASE_URL}/users/${id}`, options)
    .map((res) => res.json());
}


  // toProfile() {
  //   this.router.navigate([`profile/${id}`]);
  // }

// getCurrentUser(id) {
// let headers = new Headers({ 'Authorization': 'JWT ' + this.authService.token });
// let options = new RequestOptions({ headers: headers });
// return this.http.get(`${this.BASE_URL}/users/${id}`, options)
//   .map((res) => res.json());
// }
//




}
