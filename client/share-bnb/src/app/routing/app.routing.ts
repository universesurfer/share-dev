import { Routes } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { HomeComponent } from '../home/home.component';
import { RentalListingsComponent } from '../rental-listings/rental-listings.component';
import { SingleRentalComponent } from '../rental-listings/single-rental/single-rental.component';
import { ProfileComponent } from '../profile/profile.component'
import { AuthService } from '../services/auth.service';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'rentals', component: RentalListingsComponent },
    { path: 'listing', component: SingleRentalComponent },
    { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthService] }
    // { path: 'home', component: HomeComponent, canActivate: [AuthService] },

    { path: '**', redirectTo: '' }
];
