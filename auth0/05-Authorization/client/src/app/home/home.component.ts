import { AuthService } from '../auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'auth0-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public auth: AuthService) { }

}
