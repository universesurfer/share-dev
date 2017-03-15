import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router, CanActivate } from '@angular/router';
import { HomeComponent } from '../../home/home.component';
import { RentalListingsComponent } from '../../rental-listings/rental-listings.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class HomeAwayService {

  public token: string;

  // LOCATION COORDINATES OF USER VICINITY SEARCH
  lat: number;
  lng: number;

  // LOCATION COORDINATES FOR EACH LISTING RETURNED FROM SEARCH
  listingCoordinates: Array<Object> = [];


  //Stores the returned listings JSON based on search
  returnedListings: any;

  constructor(
    private http: Http,
    private router: Router) {

    // Set Token Variable
      this.token = "NmU3ODBmYjgtOGExNS00ZDc1LWIzODYtOGUzMjY3N2JjY2Zi";
      if (this.token != null) {
        console.log("API token works");
      } else {
        alert("API token not working");
      }

  }



//SEARCH LISTINGS

searchListings(location, newGuestValue, startDate, endDate) {
  console.log("search listing", location, newGuestValue, startDate, endDate);
  let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
  let options = new RequestOptions({ headers: headers });
  return this.http.get(`https://ws.homeaway.com/public/search?q=${location}&minSleeps=${newGuestValue}&availabilityEnd=${endDate}&availabilityStart=${startDate}`, options)
    .map((res) => {
      this.returnedListings = res.json()
      return res.json();

    })
    // .catch((err) => {
    //   console.log(err);
    // });

  }




}
