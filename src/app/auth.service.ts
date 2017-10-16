import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

interface PostBody {
  client_id: number;
  client_secret: string;
  code: string;
}

@Injectable()
export class AuthService {
  public redirectUrl: string;

  private oauthUrl: string = 'https://www.strava.com/oauth/authorize?';
  private clientId: number = 20571;
  private responseType: string = 'code';
  public redirectUri: string = 'http://localhost:4200/activity-list';
  private scope: string = 'view_private,write';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public login(): void {
    window.location.href = `${this.oauthUrl}client_id=${this.clientId}&response_type=code` +
      `&redirect_uri=${this.redirectUri}&scope=${this.scope}`;
  }

  public tokenExchange(code: string, url: string) {
    const tokenUrl: string = 'https://www.strava.com/oauth/token';
    const body: PostBody = {
      client_id: this.clientId,
      client_secret: '58f848c0c2048a249eeab6eb0ecbe7a97172c768',
      code: code
    };
    return this.http.post(tokenUrl, body).subscribe(data => {
      const accessToken = data['access_token'];
      localStorage.setItem('accessToken', accessToken);
      if (url.substring(0, 14) === '/activity-list') {
        this.router.navigate(['activity-list']);
      } else {
        this.router.navigate([url]);
      }
    },
      (error: HttpErrorResponse) => {
        console.error(error.error);
    });
  }

}
