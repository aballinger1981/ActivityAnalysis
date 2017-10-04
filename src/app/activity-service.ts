import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ActivityService {
  private baseUrl: string = 'https://www.strava.com/api/v3/activities?access_token=e966eb31b5f5d41b9b35da95c2af2451801891ef';

  constructor(private http: HttpClient) { }

  public getActivities(): void {
    this.http.get(this.baseUrl).subscribe(data => {
      console.log(data);
    });
  }

}
