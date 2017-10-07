import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ActivityStoreService {
  private activitiesUrl: string = 'https://www.strava.com/api/v3/activities?';
  private parameters = 'access_token=e966eb31b5f5d41b9b35da95c2af2451801891ef&id=1213479230&include_all_efforts=true';

  constructor(
    private http: HttpClient
  ) { }


  // public getAuthorization(): void {
  //   const headers: HttpHeaders = new HttpHeaders()
  //     .set('Access-Control-Allow-Origin', '*')
  //     .set('Accept', 'text/html');

  //   const options = {
  //     headers: headers,
  //     responseType: 'text' as 'text'
  //   };

  //   this.http.get(`https://cors-anywhere.herokuapp.com/${this.oauthUrl}client_id=${this.clientId}&response_type=code` +
  //     `&redirect_uri=${this.redirectUri}&scope=${this.scope}`, options)
  //     .subscribe(data => {
  //     console.log(data);
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error.message);
  //   });
  // }

  public getActivities(): void {
    this.http.get(this.activitiesUrl + this.parameters).subscribe(data => {
      console.log(data);
    });
  }

}
