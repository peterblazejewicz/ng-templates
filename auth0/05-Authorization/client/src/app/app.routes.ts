import { PingComponent } from './ping/ping.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'ping', component: PingComponent },
  { path: '**', redirectTo: '' }
];
