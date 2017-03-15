import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HomeAwayService } from '../services/homeaway-api/home-away.service';
import { Router, RouterModule } from '@angular/router';
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


  // bathrooms: any;
  rentalListings: any;

  userSearchLat: number;          //Latitude of user search
  userSearchLng: number;          //Longitude of user search
  zoom: number = 10;



  constructor(

    private mapsAPILoader: MapsAPILoader,
    private router: Router,
    private homeAwayService: HomeAwayService,
    private ngZone: NgZone,
    private http: Http,
    private daterangepickerOptions: DaterangepickerConfig


  ) {}

  ngOnInit() {

    this.userSearchLat = this.homeAwayService.lat;
    console.log(this.userSearchLat);
    this.userSearchLng = this.homeAwayService.lng;

    this.rentalListings = this.homeAwayService.returnedListings.entries
    console.log(this.rentalListings);

    // this.returnListingsMarkers();


}




    returnListingsMarkers() {
        var placeLat;
        var placeLng;
        this.homeAwayService.returnedListings.forEach( listing => {
          placeLat = listing.location.lat;
          placeLng = listing.location.lng;

        });

        this.homeAwayService.listingCoordinates.push(placeLat, placeLng);
        console.log(this.homeAwayService.listingCoordinates);

    }





}
