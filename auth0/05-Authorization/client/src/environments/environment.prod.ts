import { AuthConfig } from '../app/auth/auth-config';

export const environment = {
  production: true,
  API_URL: 'http://localhost:5000/api'
};

export const AUTH_CONFIG: AuthConfig = {
  clientID: '',
  domain: '',
  callbackURL: 'http://localhost:4200/'
};
