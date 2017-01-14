import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { AUTH_CONFIG } from '../../environments/environment';

@Injectable()
export class AuthService implements IAuthService {

  lock = new Auth0Lock(AUTH_CONFIG.clientID, AUTH_CONFIG.domain, {
    allowedConnections: ['github'],
    autoclose: true,
    auth: {
      redirectUrl: AUTH_CONFIG.callbackURL,
      responseType: 'token'
    }
  });

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
  }

  public handleAuthentication(): void {
    this.lock.on('authenticated', (authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
          if (error) {
            console.log(error);
            return;
          }
          this.setUser(authResult, profile);
        });
      } else if (authResult && authResult.error) {
        alert(`Error: ${authResult.error}`);
      }
    });
  }

  private setUser(authResult, profile): void {
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('profile', JSON.stringify(profile));
  }
}


export interface IAuthService {
  isAuthenticated(): boolean;
  login(): void;
  logout(): void;
  handleAuthentication(): void;
}

