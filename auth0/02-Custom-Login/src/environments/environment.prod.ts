import { AuthConfig } from '../app/auth/auth-config';

export const environment = {
  production: true
};

export const AUTH_CONFIG: AuthConfig = {
  clientID: '',
  domain: '',
  callbackURL: 'http://localhost:4200/'
};
