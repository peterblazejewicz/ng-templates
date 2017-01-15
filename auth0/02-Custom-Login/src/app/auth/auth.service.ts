import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { AUTH_CONFIG } from '../../environments/environment';

@Injectable()
export class AuthService implements IAuthService {

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientID,
    redirectUri: AUTH_CONFIG.callbackURL,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'token id_token'
  });

  constructor(private router: Router) { }

  public isAuthenticated(): boolean {
    return tokenNotExpired();
  }


  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        this.router.navigate(['/home']);
      } else if (authResult && authResult.error) {
        alert(`Error: ${authResult.error}`);
      }
    });
  }

  public login(username: string, password: string): void {
    this.auth0.client.login({
      realm: 'Username-Password-Authentication',
      username,
      password
    }, (err, data) => {
      if (err) {
        alert(`Error: ${err.description}`);
        return;
      }
      this.setUser(data);
      this.router.navigate(['/home']);
    });
  }

  public signup(email: string, password: string): void {
    this.auth0.redirect.signupAndLogin({
      connection: 'Username-Password-Authentication',
      email,
      password,
    }, function(err) {
      if (err) {
        alert(`Error: ${err.description}`);
      }
    });
  }

  public loginWithGithub(): void {
    this.auth0.authorize({
      connection: 'github',
    }, function (err) {
      if (err) {
        alert(`Error: ${err.description}`);
      }
    });
  }

  public loginWithGoogle(): void {
    this.auth0.authorize({
      connection: 'google-oauth2',
    }, function (err) {
      if (err) {
        alert(`Error: ${err.description}`);
      }
    });
  }

  public logout(): void {
    // Remove token from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
  }

  private setUser(authResult): void {
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
  }
}


export interface IAuthService {
  handleAuthentication(): void;
  isAuthenticated(): boolean;
  login(username: string, password: string): void;
  loginWithGithub(): void;
  loginWithGoogle(): void;
  logout(): void;
  signup(username: string, password: string): void;
}

