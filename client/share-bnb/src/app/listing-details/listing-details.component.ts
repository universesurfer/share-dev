import { Component, OnInit, Input } from '@angular/core';
import { HomeAwayService } from './../services/homeaway-api/home-away.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css']
})
export class ListingDetailsComponent implements OnInit {


  @Input() details: any = {};
  @Input() location: any;
  @Input() adContent: any;
  @Input() unitContent: any;
  @Input() features: any;
  @Input() prices: any;

  constructor(
    private router: Router,
    private homeAwayService: HomeAwayService

  ) { }

  ngOnInit() {
    // console.log("details", this.details);
    // console.log("location", this.location)
  }






}
