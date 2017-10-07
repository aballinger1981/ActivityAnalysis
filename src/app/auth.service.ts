import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  public redirectUrl: string;

  private oauthUrl: string = 'https://www.strava.com/oauth/authorize?';
  private clientId: number = 20571;
  private responseType: string = 'code';
  public redirectUri: string = 'http://localhost:4200/token-exchange';
  private scope: string = 'view_private,write';

  constructor() { }

  public login(): void {
    window.location.href = `${this.oauthUrl}client_id=${this.clientId}&response_type=code` +
      `&redirect_uri=${this.redirectUri}&scope=${this.scope}`;
  }

}
