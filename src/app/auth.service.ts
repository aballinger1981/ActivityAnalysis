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
  public clientId: number = 20571;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public login(): void {
    const redirectUri: string = 'http://localhost:5200/activity-list';
    const url: string = 'https://www.strava.com/oauth/authorize?';
    const scope: string = 'view_private,write';
    window.location.href = `${url}client_id=${this.clientId}&response_type=code` +
      `&redirect_uri=${redirectUri}&scope=${scope}`;
  }

  public tokenExchange(code: string, url: string): void {
    const tokenUrl: string = 'https://www.strava.com/oauth/token';
    const body: PostBody = {
      client_id: this.clientId,
      client_secret: '58f848c0c2048a249eeab6eb0ecbe7a97172c768',
      code: code
    };
    const request = this.http.post(tokenUrl, body).subscribe(data => {
      const accessToken = data['access_token'];
      localStorage.setItem('accessToken', accessToken);
      // if (url.substring(0, 14) === '/activity-list') {
        this.router.navigate(['activity-list']);
      // } else {
      //   this.router.navigate([url]);
      // }
    },
      (error: HttpErrorResponse) => {
        console.error(error);
      });
  }

}
