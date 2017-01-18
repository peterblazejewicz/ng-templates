import { PingComponent } from './ping/ping.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'ping', component: PingComponent },
  { path: '**', redirectTo: '' }
];
