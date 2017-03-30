import { Component, OnInit, Input } from '@angular/core';
import { HomeAwayService } from './../services/homeaway-api/home-away.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-listing',
  templateUrl: './card-listing.component.html',
  styleUrls: ['./card-listing.component.css']
})
export class CardListingComponent implements OnInit {

  @Input() listing: any;

  rentalId: any;
  // likes = 0;

  constructor(
    private router: Router,
    private homeAwayService: HomeAwayService

  ) { }

  ngOnInit() {
    console.log("listing", this.listing);
  }

  // likeIt() {
  //   this.likes++;
  // }


  seeListing() {
      this.router.navigate([`/listing`],
        { queryParams : {
            id: this.listing.listingId,
            }
        });
  }




}
