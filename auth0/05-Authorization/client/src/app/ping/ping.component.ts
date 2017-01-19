import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

import { AuthService } from '../auth/auth.service';
import { AUTH_CONFIG } from '../../environments/environment';

@Component({
  selector: 'auth0-ping',
  templateUrl: './ping.component.html',
  styleUrls: ['./ping.component.css']
})
export class PingComponent implements OnInit {

  message: string = '';

  constructor(public auth: AuthService, public http: Http, public authHttp: AuthHttp) { }


  ngOnInit() {
  }

  public ping(): void {
    this.message = '';
    this.http.get(`${AUTH_CONFIG.apiUrl}/values/ping`)
      .map(res => res.json())
      .subscribe(
        data => this.message = data.message,
        error => this.message = error
      );
  }

  public securedPing(): void {
    this.message = '';
    this.authHttp.get(`${AUTH_CONFIG.apiUrl}/values/secured/ping`)
      .map(res => res.json())
      .subscribe(
        data => this.message = data.message,
        error => this.message = error
      );

  }
}
