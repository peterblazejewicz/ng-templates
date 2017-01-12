import { Injectable } from '@angular/core';

@Injectable()
export class AuthService implements IAuthService {

  lock: any;

  constructor() {
    this.lock = new Auth0Lock('', '', {});
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

