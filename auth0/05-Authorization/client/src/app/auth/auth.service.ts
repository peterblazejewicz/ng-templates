import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { AUTH_CONFIG } from '../../environments/environment';

import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AuthService implements IAuthService {

  lock = new Auth0Lock(AUTH_CONFIG.clientID, AUTH_CONFIG.domain, {
    oidcConformant: true,
    autoclose: true,
    auth: {
      redirectUri: AUTH_CONFIG.callbackURL,
      responseType: 'token id_token',
      params: {
        scope: 'openid read:messages'
      }
    }
  });

  userProfile: any;

  constructor(private router: Router) {
    this.lock.on('show', () => {
      console.log('show');
    });
    this.lock.on('hide', () => {
      console.log('hide');
    });
    this.lock.on('unrecoverable_error', (error) => {
      console.log(`unrecoverable_error: ${error}`);
    });
    this.lock.on('authorization_error', (error) => {
      console.log(`authorization_error ${error}`);
    });
    this.lock.on('hash_parsed', (results) => {
      console.log(`hash_parsed${results}`);
    });
  }

  public handleAuthentication(): void {
    this.lock.on('authenticated', (authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setUser(authResult);
      } else if (authResult && authResult.error) {
        alert(`Error: ${authResult.error}`);
      }
    });
  }

  public getProfile(cb): void {
    let accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw 'Access token must exist to fetch profile';
    }
    this.lock.getUserInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  getRole(): string {
    const namespace = 'https://example.com';
    const idToken = localStorage.getItem('id_token');
    return jwt_decode(idToken)[`${namespace}/role`] || null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  public isAuthenticated(): boolean {
    return tokenNotExpired();
  }

  public login(): void {
    this.lock.show();
  }

  public logout(): void {
    // Remove token from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    this.router.navigate(['home']);
  }

  private setUser(authResult): void {
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
  }
}

export interface IAuthService {
  getProfile(cb: Function): void;
  getRole(): string;
  handleAuthentication(): void;
  isAdmin(): boolean;
  isAuthenticated(): boolean;
  login(): void;
  logout(): void;
}

