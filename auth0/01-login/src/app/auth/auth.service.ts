import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from '../../environments/environment';

@Injectable()
export class AuthService implements IAuthService {

  lock: any;

  constructor() {
    this.lock = new Auth0Lock(AUTH_CONFIG.clientID, AUTH_CONFIG.domain, {
      autoclose: true,
      auth: {
        redirectUrl: AUTH_CONFIG.callbackURL,
        responseType: 'id_token',
        audience: `https://${AUTH_CONFIG.domain}/userinfo`
      }
    });
  }

  public isAuthenticated(): boolean {
    return true;
  }

  public login(): void {
    return;
  }

  public logout(): void {
    return;
  }

  public handleAuthentication(): void {
    return;
  }
}


export interface IAuthService {
  isAuthenticated(): boolean;
  login(): void;
  logout(): void;
  handleAuthentication(): void;
}

