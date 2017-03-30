import { Input, Output, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HomeAwayService } from '../../services/homeaway-api/home-away.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Daterangepicker } from 'ng2-daterangepicker';  //date picker
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import { AgmCoreModule } from "angular2-google-maps/core";   //Google Maps
import { MapsAPILoader } from 'angular2-google-maps/core';
import { SebmGoogleMap, SebmGoogleMapMarker } from 'angular2-google-maps/core';

import { CarouselModule } from 'ng2-bootstrap'


@Component({
  selector: 'app-single-rental',
  templateUrl: './single-rental.component.html',
  styleUrls: ['./single-rental.component.css']
})
export class SingleRentalComponent implements OnInit {

  //Setting the input of this child component to link with parent (rental-listings) html template

  // @Input() listingDescription: any;

  //Stores JSON of individual rental for details page...
  rentalDetails: any = {};    //could not use this variable without initializing it as an object with = {}.
  photos: Array<any>

  rentalLocation: any;
  adContent: any;
  features: any;
  prices: any;

  unitContent: any;

  mainImage: string;

  constructor(

    private mapsAPILoader: MapsAPILoader,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private homeAwayService: HomeAwayService,
    private ngZone: NgZone,
    private http: Http,
    private daterangepickerOptions: DaterangepickerConfig

  ) { }

  ngOnInit() {
    // takes the param id of the individual listing
    // calls to HomeAway API with that param id
    // prints the information on the page

    this.activatedRoute.queryParams.subscribe(params => {
      console.log('params', params);
      this.homeAwayService.getListingById(params.id)
        .subscribe((res: Response) =>  {
          this.ngZone.run(()=>{
            this.rentalDetails = res;
            this.rentalLocation = res.location;
            this.adContent = res.adContent;
            this.unitContent = res.units[0].unitContent;
            this.features = res.units[0].unitContent.features;
            this.prices = res.units[0].ratePeriods[0].rates;
            console.log(this.features);

            console.log(this.rentalLocation);
            this.mainImage = res.photos.thumbnails;
            this.photos = res.photos.photos;
            console.log(this.rentalDetails);
          })

          // this.rentalListingId = res.entries.;
          // console.log(this.rentalListings);

      });
    });
  }

}
