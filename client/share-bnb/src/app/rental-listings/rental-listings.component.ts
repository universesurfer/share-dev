import { Component, Input, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HomeAwayService } from '../services/homeaway-api/home-away.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Daterangepicker } from 'ng2-daterangepicker';  //date picker
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import { AgmCoreModule } from "angular2-google-maps/core";   //Google Maps
import { MapsAPILoader } from 'angular2-google-maps/core';
import { SebmGoogleMap, SebmGoogleMapMarker } from 'angular2-google-maps/core';

@Component({
  selector: 'app-rental-listings',
  templateUrl: './rental-listings.component.html',
  styleUrls: ['./rental-listings.component.css'],
})
export class RentalListingsComponent implements OnInit {

  // @ViewChild('listingId') = number;

  // bathrooms: any;
  rentalListings: any;

  userSearchLat: number;          //Latitude of user search
  userSearchLng: number;          //Longitude of user search
  zoom: number = 10;



  constructor(

    private mapsAPILoader: MapsAPILoader,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private homeAwayService: HomeAwayService,
    private ngZone: NgZone,
    private http: Http,
    private daterangepickerOptions: DaterangepickerConfig


  ) {}

  ngOnInit() {
    // get the params info from url
    // make connection to api through service
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('params', params);
      this.userSearchLat = parseFloat(params.lat);
      this.userSearchLng = parseFloat(params.lng);
      console.log(this.userSearchLat);
      this.homeAwayService.searchListings(params.location, params.minSleeps, params.start, params.end)
        .subscribe((res: Response) =>  {
          console.log(res)
          this.rentalListings = res.entries;
          console.log(this.rentalListings);
      });
    });
    // this.userSearchLat = this.homeAwayService.lat;
    // console.log(this.userSearchLat);
    // this.userSearchLng = this.homeAwayService.lng;
    //
    // this.rentalListings = this.homeAwayService.returnedListings.entries
    // console.log(this.rentalListings);

    // this.returnListingsMarkers();


  }
  //



}
