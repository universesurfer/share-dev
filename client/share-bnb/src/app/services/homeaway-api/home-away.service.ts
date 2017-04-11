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


  //Stores the returned listings JSON based on search
  returnedListings: any;

  //Stores returned individual listing JSON
  listingInfo: any;

  //Listing reviews
  listingReviews: any;

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
  console.log("token search ", this.token);
  let options = new RequestOptions({ headers: headers });
  return this.http.get(`https://ws.homeaway.com/public/search?q=${location}&minSleeps=${newGuestValue}&availabilityEnd=${endDate}&availabilityStart=${startDate}&imageSize=LARGE`, options)
    .map((res) => {
      this.returnedListings = res.json()
      return res.json();
    })
    // .catch((err) => {
    //   console.log(err);
    // });
  }



//Get rental listing by ID
// https://ws.homeaway.com/public/listing?id=4133481&q=DETAILS&q=LOCATION&q=PHOTOS&q=REVIEWS&q=RATES&q=AVAILABILITY
  getListingById(id) {
    console.log("listing id", id);
    console.log("token listing ", this.token);
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`https://ws.homeaway.com/public/listing?id=${id}&q=DETAILS&q=LOCATION&q=PHOTOS&q=REVIEWS&q=RATES&q=AVAILABILITY`, options)
      .map((res) => {
      this.listingInfo = res.json()
      return res.json();
    })
  }

  //Get rental reviews

  getListingReviews(listingId, unitId) {
    console.log("listing id", listingId, 'unitId', unitId);
    console.log("token listing ", this.token);
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`https://ws.homeaway.com/public/listingReviews?listingId=${listingId}&unitId=${unitId}`, options)
      .map((res) => {
      this.listingReviews = res.json()
      return res.json();
      })
  }




}
