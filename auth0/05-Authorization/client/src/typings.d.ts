declare var auth0: any;
declare var Auth0Lock: any;
declare module "jwt-decode" {
  function decode(token: string): any;
  namespace decode { }
  export = decode;
}
