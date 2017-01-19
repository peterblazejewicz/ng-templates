import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'auth0-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  idToken: string;

  constructor() { }

  ngOnInit() {
    let idToken = localStorage.getItem('id_token');
    this.idToken = jwt_decode(idToken);
  }

}
