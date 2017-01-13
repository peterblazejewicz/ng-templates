import { AuthService } from './auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'auth0-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public auth: AuthService) { }
}
