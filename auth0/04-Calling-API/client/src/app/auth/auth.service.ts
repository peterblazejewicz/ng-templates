import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { AUTH_CONFIG } from '../../environments/environment';

@Injectable()
export class AuthService implements IAuthService {

  lock = new Auth0Lock(AUTH_CONFIG.clientID, AUTH_CONFIG.domain, {
    oidcConformant: true,
    autoclose: true,
    auth: {
      audience: `https://${AUTH_CONFIG.domain}/userinfo`,
      redirectUri: AUTH_CONFIG.callbackURL,
      responseType: 'token id_token',
      params: {
        scope: 'openid profile'
      }
    }
  });

  userProfile: any;

  constructor(private router: Router) { }

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

  public login(): void {
    this.lock.show();
  }

  public isAuthenticated(): boolean {
    return tokenNotExpired();
  }

  public logout(): void {
    // Remove token from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    // Go back to the home route
    this.router.navigate(['/home']);
  }

  private setUser(authResult): void {
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
  }
}


export interface IAuthService {
  getProfile(cb: Function): void;
  handleAuthentication(): void;
  isAuthenticated(): boolean;
  login(): void;
  logout(): void;
}

