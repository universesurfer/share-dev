import { Component, OnInit, Input } from '@angular/core';
import { HomeAwayService } from './../services/homeaway-api/home-away.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-listing-reviews',
  templateUrl: './listing-reviews.component.html',
  styleUrls: ['./listing-reviews.component.css']
})
export class ListingReviewsComponent implements OnInit {

  @Input() reviewEntries: any;

  constructor(
    private router: Router,
    private homeAwayService: HomeAwayService
  ) { }

  ngOnInit() {
    console.log(this.reviewEntries);
  }

}
