import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { Daterangepicker } from 'ng2-daterangepicker';  //date picker

// Services
import { AuthService } from './services/auth.service';
import { HomeAwayService } from './services/homeaway-api/home-away.service';

import { RouterModule } from "@angular/router";
import { routes } from './routing/app.routing';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { AgmCoreModule } from "angular2-google-maps/core";
import { RentalListingsComponent } from './rental-listings/rental-listings.component';
import { SingleRentalComponent } from './rental-listings/single-rental/single-rental.component';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    RentalListingsComponent,
    SingleRentalComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCLmODzvt82lNOv-p_JpvPoLqk8nME9kCA",
      libraries: ["places"]}),
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2AutoCompleteModule,
    Daterangepicker,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService, HomeAwayService],
  bootstrap: [AppComponent]
})
export class AppModule { }
