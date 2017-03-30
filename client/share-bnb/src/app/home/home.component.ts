import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Injectable, EventEmitter } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from 'angular2-google-maps/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HomeAwayService } from '../services/homeaway-api/home-away.service';
import { Router, RouterModule } from '@angular/router';

import { Daterangepicker } from 'ng2-daterangepicker';  //date picker
import { DaterangepickerConfig } from 'ng2-daterangepicker';
// import {MomentModule} from 'angular2-moment/module';
import * as moment from 'moment';

import 'rxjs/add/operator/map';
import 'rxjs/Rx';



@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  //USER INPUTS - LOCATION, NUMBER OF GUESTS (SLEEPS AMOUNT), AND CALENDAR DATES
  location: string;
  userSearchLat: number;
  userSearchLng: number;
  private markers = [];


  sleepsAmount: number;
  // returnedListings: any;

  //GUEST INPUT OPTIONS
  guestOptions: Array<number>;
  newGuestValue: number;

  // LISTING ID
  listingId: any;

  //DATE INPUT
  // public dateRange: any = {};
  startDate: any;
  endDate: any;

  private selectedDate(value: any) {

        this.startDate = moment(value.start).format('YYYY-MM-DD');
        console.log(this.startDate);

        this.endDate = moment(value.end).format('YYYY-MM-DD');
        console.log(this.endDate)
        // console.log(value.end.format("YYYY-MM-DD"));
    }


// moment().format('D MMM YYYY');






  @ViewChild("search")
  // @ViewChild("returnedListings")
  public searchElementRef: ElementRef;


  constructor(
    // private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private router: Router,
    private ngZone: NgZone,
    private http: Http,
    private homeAwayService: HomeAwayService,
    private daterangepickerOptions: DaterangepickerConfig

  ) {

    this.daterangepickerOptions.settings = {
          locale: { format: 'MM/DD/YYYY' },
          alwaysShowCalendars: false
      };


    }

  ngOnInit() {

    //Setting array values of guest input
    this.guestOptions = [1 ,2 ,3 ,4 ,5 ,6 ,7 ,8 ,9 ,10 ,11 ,12];

    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    // this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {

      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();


          //Returning the location vicinity in the console
          this.location = place.vicinity;
          console.log(place);
          console.log(this.location);


  //SET LAT AND LNG OF USER LOCATION SEARCH
          this.homeAwayService.lat = place.geometry.location.lat();
          this.homeAwayService.lng = place.geometry.location.lng();
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          console.log("lat", this.latitude)
          console.log("lng", this.longitude)
          // this.userSearchLng = place.geometry.location.lng();
          // console.log(this.homeAwayService.lat);
          // console.log(this.userSearchLng);


    // INITIALIZE THE MAP
    var map;
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    }



          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }



  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }


  }



                                          // GET GUEST VALUES

  guestAmountInput(newValue){
     console.log(newValue);
     this.newGuestValue = newValue;
   }



  sendGuestAmount(): void {
      console.log("Number of guests: " + this.sleepsAmount);

  }


//SEARCH HOMEAWAY LISTINGS - Navigate to /rentals/params - can make API call directly from URL
//                           See home-away.service.ts and rental-listings-component.ts ngOnInit() for relationship
  searchSomething() {
    this.router.navigate([`/rentals`],
      { queryParams : {
                      location: this.location,
                      minSleeps: this.newGuestValue,
                      start: this.startDate,
                      end: this.endDate,
                      lat: this.latitude,
                      lng: this.longitude,
                      id: this.listingId
                    }
      })
    // this.homeAwayService.searchListings(this.location, this.newGuestValue, this.startDate, this.endDate)
    // .subscribe((res: Response) =>  {
    //   this.router.navigate(['/rentals'])
    // })

    console.log('location ', this.location);

  }


}
